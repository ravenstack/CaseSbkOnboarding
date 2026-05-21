async function testarConexao() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        console.log("Status da API:", data.status);
        // Opcional: exibir na tela para o usuário ver
        document.getElementById('status-api').innerText = "Conectado ao Backend";
    } catch (err) {
        console.error("Falha na integração:", err);
    }
}
testarConexao();