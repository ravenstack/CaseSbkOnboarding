const express = require('express');
const path = require('path');
const app = express();

// Middleware para JSON
app.use(express.json());

// 🔌 CONEXÃO FUNCIONAL: Servir arquivos estáticos (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
const onboardingRoutes = require('./routes/onboardingRoutes');
app.use('/api', onboardingRoutes);

// Rota de Teste de Conexão (Para a banca ver que o back está vivo)
app.get('/api/status', (req, res) => {
    res.json({ status: "Backend online e conectado ao front!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`StepUp rodando na porta ${PORT}`));