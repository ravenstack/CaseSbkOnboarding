const OnboardingProcesso = require('../models/OnboardingProcesso');
const HistoricoOnboarding = require('../models/HistoricoOnboarding');
const { enviarMensagemTeams, enviarEmailSimulado } = require('./notificadorService');

class OnboardingService {
    
    async avançarEtapa(processoId, usuarioQueAlterou) {
        const processo = await OnboardingProcesso.findByPk(processoId, { include: 'Colaborador' });
        if (!processo) throw new Error("Processo de onboarding não encontrado.");
        
        const etapaAnterior = processo.etapa_atual;
        let proximaEtapa = 'CONCLUIDO';
        let proximoResponsavel = 'NENHUM';
        let diasDePrazo = 0;

        if (etapaAnterior === 'DOCUMENTACAO_RH') {
            proximaEtapa = 'ACESSOS_TI';
            proximoResponsavel = 'TI';
            diasDePrazo = 2;
        } else if (etapaAnterior === 'ACESSOS_TI') {
            proximaEtapa = 'APRESENTACAO_GESTOR';
            proximoResponsavel = 'GESTOR';
            diasDePrazo = 3;
        } else if (etapaAnterior === 'APRESENTACAO_GESTOR') {
            proximaEtapa = 'CONCLUIDO';
            proximoResponsavel = 'NENHUM';
            diasDePrazo = 0;
        }

        const novoPrazo = new Date();
        novoPrazo.setDate(novoPrazo.getDate() + diasDePrazo);

        processo.etapa_atual = proximaEtapa;
        processo.responsavel_atual = proximoResponsavel;
        processo.status_etapa = proximaEtapa === 'CONCLUIDO' ? 'CONCLUIDO' : 'PENDENTE';
        processo.data_entrada_etapa = new Date();
        processo.prazo_limite_etapa = novoPrazo;
        await processo.save();

        await HistoricoOnboarding.create({
            processo_id: processo.id,
            etapa_anterior: etapaAnterior,
            etapa_nova: proximaEtapa,
            alterado_por: usuarioQueAlterou,
            data_mudanca: new Date()
        });

        if (etapaAnterior === 'DOCUMENTACAO_RH') {
            const emailCandidato = processo.Colaborador ? processo.Colaborador.email : 'candidato@email.com';
            
            const msgTI = `📢 Alerta StepUp: O RH concluiu as tarefas. A etapa atual agora é [ACESSOS_TI]. Responsável: @TI. Prazo: ${novoPrazo.toLocaleDateString()}`;
            await enviarMensagemTeams('TI', msgTI);
            await enviarEmailSimulado('TI', msgTI);

            const msgCandidato = `🎉 Olá! Sua documentação foi aprovada pelo RH. O setor de TI já foi notificado e está preparando seus acessos e ferramentas!`;
            await enviarEmailSimulado(emailCandidato, msgCandidato);
        } else if (proximaEtapa !== 'CONCLUIDO') {
            const mensagem = `📢 Alerta StepUp: O processo de onboarding entrou na etapa [${proximaEtapa}]. Responsável: @${proximoResponsavel}. Prazo até: ${novoPrazo.toLocaleDateString()}`;
            await enviarMensagemTeams(proximoResponsavel, mensagem);
            await enviarEmailSimulado(proximoResponsavel, mensagem);
        }

        return processo;
    }

    async verificarProcessosAtrasados() {
        const agora = new Date();
        const processosAtrasados = await OnboardingProcesso.findAll({
            where: {
                etapa_atual: { [Op.ne]: 'CONCLUIDO' },
                prazo_limite_etapa: { [Op.lt]: agora }
            }
        });

        for (const processo of processosAtrasados) {
            processo.status_etapa = 'ATRASADO';
            await processo.save();

            const mensagemAviso = `🚨 COBRANÇA AUTOMÁTICA STEPUP: O setor [${processo.responsavel_atual}] está com o onboarding travado na etapa [${processo.etapa_atual}]. O prazo limite expirou!`;
            await enviarMensagemTeams(processo.responsavel_atual, mensagemAviso);
        }
    }
}

module.exports = new OnboardingService();