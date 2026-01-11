// lab Intermediário
const http = require('http');

const entregas = [
    { id: 1, motorista: 'Carlos', status: 'em_rota', veiculo: 'Caminhão 01' },
    { id: 2, motorista: 'Ana', status: 'entregue', veiculo: 'Van 03' },
    { id: 3, motorista: 'João', status: 'pendente', veiculo: 'Caminhão 02' },
    { id: 4, motorista: 'Carlos', status: 'em_rota', veiculo: 'Van 01' }
];


const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.url === '/entregas' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(entregas));
    }

    else if (req.url === '/entregas/ativas' && req.method === 'GET') {
        const entregasAtivas = entregas.filter(
            entrega => entrega.status === 'em_rota'
        );

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(entregasAtivas));
    }

    else if (req.url === '/entregas/resumo' && req.method === 'GET') {
        const resumo = entregas.map(entrega => ({
            id: entrega.id,
            status: entrega.status
        }));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(resumo));
    }
    // Desafio1
    else if (req.url === '/pendentes' && req.method === 'GET') {
        const entregasPendentes = entregas.filter(entrega => entrega.status === 'pendente');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(entregasPendentes));
    }

    else if (req.url.startsWith('/motoristas') && req.method === 'GET') {
        const url = new URL(req.url, 'http://localhost:3000')

        const nomeMotorista = url.searchParams.get('nome')
        // Desafio 2
        if (nomeMotorista){
            const entregasMotorista = entregas.filter(entrega => entrega.motorista === nomeMotorista)
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(entregasMotorista));
        }
        else {
            const motoristas = entregas
                .map(entrega => entrega.motorista)
                .filter((motorista, index, array) => {
                    return array.indexOf(motorista) === index;
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(motoristas));
        }
    }


    else if (req.url === '/relatorio' && req.method === 'GET') {
        const total = entregas.length

        const emRota = entregas.filter(e => e.status === 'em_rota').length;

        const entregues = entregas.filter(e => e.status === 'entregue').length;

        const relatorio = {
            total: total,
            em_rota: emRota,
            entregues: entregues
        }

        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(relatorio));
    }

    // Desafio 3
    else if (req.url === '/relatorio/motoristas' && req.method === 'GET') {
        const totalEntregasMotoristas = []

        let maiorEntrega = 0
        let motoristaMaiorEntrega

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

        const relatorioMotoristas = {
            motorista_mais_entregas: {
                nome_motorista: motoristaMaiorEntrega,
                qtd_entregas: maiorEntrega
            },
            total_por_motorista: totalEntregasMotoristas
        };

        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(relatorioMotoristas));
    }

    else {
        res.statusCode = 404;
        res.end(' Rota não encontrada');
    }
})

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
});