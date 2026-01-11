// Lab Iniciante
const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

//rotas
app.get('/rh/resumo', (req, res) => {
    const dadosResumido = {
        total_colaboradores: 1250,
        turno_atual: "Segundo Turno",
        setor_vago: "Nenhum"
    }

    res.status(200).json(dadosResumido)
});

app.get('/manutencao', (req, res) => {
    const dadosManutencao = {
        maquinas_criticas: 0,
        ultima_revisao: "2023-10-25",
        proxima_revisao: "2023-11-25"
    }

    res.status(200).json(dadosManutencao)
});

app.get('/emergencia', (req, res) => {
    res.status(500).send("ALERTA: Sensor de incêndio não detectado.");
});


app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});