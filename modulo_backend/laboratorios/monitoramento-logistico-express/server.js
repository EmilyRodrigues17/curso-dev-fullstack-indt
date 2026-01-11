// lab intermediario
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const entregas = [
    { id: 1, motorista: 'Carlos', status: 'em_rota', veiculo: 'Caminhão 01' },
    { id: 2, motorista: 'Ana', status: 'entregue', veiculo: 'Van 03' },
    { id: 3, motorista: 'João', status: 'pendente', veiculo: 'Caminhão 02' },
    { id: 4, motorista: 'Carlos', status: 'em_rota', veiculo: 'Van 01' }
];

// Desafio 1
app.get('/status', (req, res) => {
    res.status(200).send('API ativa.')
});

app.get('/entregas', (req, res) => {
    res.status(200).json(entregas);
});

// Desafio 2
app.get('/entregas/ativas', (req, res) => {
    const entregasAtivas = entregas.filter(entrega => entrega.status === 'em_rota');

    res.status(200).json(entregasAtivas)
});

// Desafio 2
app.get('/entregas/pendentes', (req, res) => {
    const entregasPendentes = entregas.filter(entrega => entrega.status === 'pendente');

    res.status(200).json(entregasPendentes)
});

app.get('/entregas/resumo', (req, res) => {
    const resumo = entregas.map(entrega => ({
            id: entrega.id,
            status: entrega.status
        }));
    
    res.status(200).json(resumo)
});

// Desafio 3
app.get('/motoristas', (req, res) => {
    const nomeMotorista = req.query.nome;

    if (nomeMotorista) {
        const entregasMotorista = entregas.filter(entrega => entrega.motorista === nomeMotorista);
            
        res.status(200).json(entregasMotorista);
    }
    else {
        const motoristas = entregas
                .map(entrega => entrega.motorista)
                .filter((motorista, index, array) => {
                    return array.indexOf(motorista) === index;
        });

        res.status(200).json(motoristas)
    }
});

app.get('/relatorio', (req, res) => {
    const entregasTotal = entregas.length;

    const entregasEmRota = entregas.filter(e => e.status === 'em_rota').length;

    const entregasEntregues = entregas.filter(e => e.status === 'entregue').length;

    const totalEntregasMotoristas = [];

    let maiorEntrega = 0;
    let motoristaMaiorEntrega;

    entregas.forEach(entrega => {

        const motoristaEncontrado = totalEntregasMotoristas.find(m => m.nome_motorista === entrega.motorista)

        if ( motoristaEncontrado ){
            motoristaEncontrado.qtd_entregas += 1;
        }
        else {

            totalEntregasMotoristas.push({
                nome_motorista: entrega.motorista,
                qtd_entregas: 1
            })
        }
        
    });

    totalEntregasMotoristas.forEach(mot => {

        if (mot.qtd_entregas > maiorEntrega){
            maiorEntrega = mot.qtd_entregas
            motoristaMaiorEntrega = mot.nome_motorista
        }

    });

    const relatorio = {
        entregas_total: entregasTotal,
        entregas_em_rota: entregasEmRota,
        entregas_entregues: entregasEntregues,
        total_por_motorista: totalEntregasMotoristas,
        motorista_mais_entregas: {
            nome_motorista: motoristaMaiorEntrega,
            qtd_entregas: maiorEntrega
        }
    }

    res.status(200).json(relatorio)

});

// Desafio 4
app.post('/entregas', (req, res) => {

    try {
         const { motorista, status, veiculo } = req.body;

        const ultimaEntrega = entregas[entregas.length - 1]
        const ultimoId = ultimaEntrega.id + 1

        const novaEntrega = { id: ultimoId, motorista: motorista, status: status, veiculo: veiculo}

        entregas.push(novaEntrega);

        res.status(201).json({status: "success", id_nova_entrega: novaEntrega.id })
    
    }
    catch (error) {
        res.status(500).json({ status: "fail", message: `Error interno no servidor - ${error} `})
    }

});


app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});
