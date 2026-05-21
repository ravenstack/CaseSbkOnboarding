# StepUp - Sistema de Gestão Dinâmica de Onboarding 🚀

> **Status do Projeto:** MVP / Demonstração Sandbox Integrada para Banca Avaliadora

O **StepUp** é uma plataforma focada em resolver um dos maiores gargalos corporativos: o processo de *onboarding* (integração) de novos talentos. O ecossistema conecta as pontas do **Candidato**, **Recursos Humanos (RH)**, **Infraestrutura de TI** e **Gestão de Área** em um fluxo de automação contínuo e reativo, garantindo o "Dia 1" do colaborador 100% operacional.

---

## Sobre a Solução Integrada (Modo Sandbox)

Durante apresentações de pitch e MVP, simular cenários realistas de múltiplos perfis de usuários costuma gerar alta fricção (exigindo abrir 4 navegadores, múltiplos logins e dados desconectados). 

### O Fluxo do Ecossistema:
1. **Mariana Costa (RH):** Valida a papelada e assinaturas de admissão do candidato Pedro Alencar. Ao clicar em concluir, o sistema dispara um gatilho.
2. **Lucas Rezende (TI):** Recebe um **Alerta Reativo Pulsante** em sua aba lateral sinalizando a entrada imediata de um ticket na fila para provisionamento de Hardware (Lenovo ThinkPad) e acessos de e-mail/VPN.
3. **Carlos Mendes (Gestor):** Assim que a TI conclui, o painel do Gestor é destravado e sinalizado com notificação para agendamento da reunião de boas-vindas e metas de 30 dias.
4. **Pedro Alencar (Candidato):** Acompanha em tempo real sua barra de progresso avançando de 15% para 100%, reduzindo a ansiedade através de um *feed* de status transparente.

---

##  Stack Tecnológica Utilizada

* **Front-end UI:** HTML5 semântico estruturado para cenários de alta fidelidade.
* **Estilização:** [Tailwind CSS v3](https://tailwindcss.com) com Plugins nativos de formulários e *Container Queries*.
* **Tipografia:** Google Fonts (*Hanken Grotesk*) focando em legibilidade de dados e estética *clean*.
* **Ícones:** Google Material Symbols Outlined.
* **Motor Reativo:** JavaScript Vanilla (ES6+) mapeando uma Máquina de Estados Finita em memória para emulação instantânea de banco de dados (Fail-Safe Ativado).
* **Frontend feito com auxilio de Inteligencia Artificial**


---

## Arquitetura Visual e Mapeamento de Cores

O painel foi projetado sob a paleta corporativa de identidade estrita da SBK:
* `deep-navy (#0F172A)` - Fundo e base estrutural dos painéis.
* `primary (#006579)` e `primary-container (#197f96)` - Foco operacional e botões de ação reativa.
* `lime-accent (#00D3DC)` - Indicadores de progresso e realces de interface.
* `success (#10B981)` e `error (#E11D48)` - Feedback visual imediato de status da fila de processos.
