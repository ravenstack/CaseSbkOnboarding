// services/onboardingService.js
// ATENDE: "Tornar explícito quem deve o quê" e "Notificar os responsáveis"

const OnboardingProcesso = require('../models/OnboardingProcesso');
const HistoricoOnboarding = require('../models/HistoricoOnboarding'); // Tabela de logs para auditoria
const { enviarMensagemTeams, enviarEmailSimulado } = require('./notificadorService');

class OnboardingService {
    
    async avançarEtapa(processoId, usuarioQueAlterou) {
        const processo = await OnboardingProcesso.findByPk(processoId);
        if (!processo) throw new Error("Processo de onboarding não encontrado.");
        
        const etapaAnterior = processo.etapa_atual;
        let proximaEtapa = 'CONCLUIDO';
        let proximoResponsavel = 'NENHUM';
        let diasDePrazo = 0;

        if (etapaAnterior === 'DOCUMENTACAO_RH') {
            proximaEtapa = 'ACESSOS_TI';
            proximoResponsavel = 'TI';
            diasDePrazo = 2; // TI tem 48h para abrir acessos
        } else if (etapaAnterior === 'ACESSOS_TI') {
            proximaEtapa = 'APRESENTACAO_GESTOR';
            proximoResponsavel = 'GESTOR';
            diasDePrazo = 3; // Gestor tem 3 dias para apresentar o time
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
l
        if (proximaEtapa !== 'CONCLUIDO') {
            const mensagem = `📢 Alerta StepUp: O processo de onboarding do colaborador entrou na etapa [${proximaEtapa}]. Responsável: @${proximoResponsavel}. Prazo até: ${novoPrazo.toLocaleDateString()}`;

            await enviarMensagemTeams(proximoResponsavel, mensagem);
            await enviarEmailSimulado(proximoResponsavel, mensagem);
        }

        return processo;
    }

    async verificarProcessosAtrasados() {
        const agora = new Date();
        // Busca processos que não terminaram e que estouraram o prazo_limite_etapa
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