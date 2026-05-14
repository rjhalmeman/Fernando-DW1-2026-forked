const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//se vier uma requisição POST para a rota /enviar-mensagem, o servidor irá processar a mensagem recebida, convertê-la para maiúsculas e enviar uma resposta de volta ao cliente.
app.post('/enviar-mensagem', (req, res) => {
    let x = req.body.x;
    let y = req.body.y;
    console.log(`A mensagem recebida foi: ${x} + ${y}`);
    console.log(` As coordenadas recebidas foram: (${x} , ${y})`)
    let mensagemFinal = ( Math.sqrt ((x**2) + (y**2)) );
    console.log(`A mensagem devolvida será: ${mensagemFinal}`);
    let h = (`Eu sou o servidor, você mandou a mensagem "${mensagemFinal}" que foi recebida com sucesso! - estou lhe respondendo para você saber disso.`);
    res.json({
        hipotenusa : mensagemFinal,
        mensagemFinal : h
    });
});

const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP()

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
})