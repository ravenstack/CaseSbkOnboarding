// Trecho do seu public/script.js que renderiza os cards na tela
function renderizarDashboard(processos) {
    const container = document.getElementById('dashboard-onboarding');
    container.innerHTML = '';

    processos.forEach(p => {
        let badgeColor = 'bg-info'; // Pendente / Em andamento
        if (p.status_etapa === 'ATRASADO') badgeColor = 'bg-danger animate-pulse'; // Atrasado (Alerta crítico)
        if (p.status_etapa === 'CONCLUIDO') badgeColor = 'bg-success';

        container.innerHTML += `
            <div class="card mb-3 shadow-sm border-start border-4 ${p.status_etapa === 'ATRASADO' ? 'border-danger' : 'border-primary'}">
                <div class="card-body">
                    <h5 class="card-title">Colaborador: ${p.nome_colaborador}</h5>
                    <p class="card-text">Etapa Atual: <strong>${p.etapa_atual}</strong></p>
                    
                    <p class="card-text">
                        Ação Pendente com: <span class="badge ${badgeColor}">${p.responsavel_atual}</span>
                    </p>
                    
                    <small class="text-muted">Prazo Limite: ${new Date(p.prazo_limite_etapa).toLocaleDateString()}</small>
                </div>
            </div>
        `;
    });
}