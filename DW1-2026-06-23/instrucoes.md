# Tutorial: A Lojinha da Vovó - Arquitetura Cliente-Servidor na Prática

## 1) Abram o GitHub e façam o download ou clone do projeto modelo:
`https://github.com/rjhalmeman/dw1-2026/2bimestre/2026-06-02 - dw e bd/`

## 2) renomeie a pasta, pode se dw1-chapelzinho (ou outro nome que você preferir)

## 3) Estrutura do Projeto
   acrescente as pastas public e database (criar essas pastas no novo projeto)

* `.env`: ajuste para suas credenciais. Edite o arquivo com as credenciais do seu banco de dados local. **Atenção: Nunca suba o arquivo `.env` para o GitHub!**. Pode adicionar no .gitignore.
* `server.js`: **Backend** (A Servidorina).
* `public/`:  **Frontend** (A Maria Clientina), contendo `index.html` e `index.css`.
* `database/`: **Banco de Dados** contendo o script SQL para criar o BD.

## 4) Banco de dados
4.1. Abra o seu SGBD (como o pgAdmin ou DBeaver).
4.2. Crie um banco de dados chamado `dw1-db-2026`. Ou outro nome, mas não esqueça de ajustar o .env.
4.3. Execute o script abaixo para criar a tabela `produto` e inserir os dados iniciais.

### `database/sqlCreate.sql`
```sql
CREATE TABLE public.produto (
    id_produto SERIAL PRIMARY KEY,
    nome_produto VARCHAR(60) NOT NULL,
    quantidade_produto INT NOT NULL,
    quantidade_minima_produto INT NOT NULL,
    quantidade_maxima_produto INT NOT NULL
);

INSERT INTO public.produto (nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto) VALUES 
('Bolo', 2, 3, 10),
('Doce', 3, 5, 10),
('Bala', 7, 10, 15),
('Pão', 18, 20, 50);
```

5) Bibliotecas necessárias (npm install)
5.1. Abra o terminal na pasta raiz do projeto.
5.2. Execute o comando `npm install` para instalar as dependências necessárias (`express`, `pg`, `cors`, `dotenv`).
5.3. Substitua o código do `server.js` pelo código abaixo. Nele, criamos uma rota `GET` para calcular o estoque e uma rota `POST` para receber mensagens.




### `server.js`
```javascript
const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Middleware para parsear as mensagens em JSON
app.use(express.json());

// Middleware CORS (Verificação de origem autorizada)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota 1: Verificar Estoque e Aplicar Regra de Negócio (GET)
app.get('/api/estoque', async (req, res) => {
    try {
        const query = 'SELECT * FROM public.produto';
        const result = await pool.query(query);
        
        let reposicao = {};
        
        //para cada produto (na tabela produto, faça ...)
        result.rows.forEach(produto => {
            if (produto.quantidade_produto < produto.quantidade_minima_produto) {
                const quantidadeParaPedir = produto.quantidade_maxima_produto - produto.quantidade_produto;
                
                let nomeFormatado = produto.nome_produto.toLowerCase();
                // if(nomeFormatado === "pãos") nomeFormatado = "paes";
                
                reposicao[nomeFormatado] = quantidadeParaPedir;
            }
        });
        
        res.json({
            sucesso: true,
            dados_reposicao: reposicao
        });
        
    } catch (error) {
        console.error('Erro ao consultar estoque:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno da Servidorina' });
    }
});

// Rota 2: Enviar e Receber Mensagens (POST)
app.post('/api/mensagens', (req, res) => {
    try {
        const mensagemRecebida = req.body.mensagem;
        
        if (!mensagemRecebida) {
            return res.status(400).json({ status: "erro", mensagem: "Bilhete vazio!" });
        }

        console.log(`Bilhete recebido da Clientina: ${mensagemRecebida}`);
        
        // Retornando um Status Code de Sucesso
        res.status(200).json({ 
            status: "sucesso", 
            mensagem: "pedidoRecebido" 
        });
        
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        res.status(500).json({ status: "erro", mensagem: 'Erro interno da Servidorina' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidorina atenta na porta ${port}`);
});
```

---

## Frontend

O usuário final não tem acesso direto ao banco de dados. Ele interage visualmente com o sistema! Vamos usar a função `fetch()` no JavaScript para conectar o **Frontend** ao **Backend**.

1. Crie uma pasta chamada `public/` na raiz do seu projeto.
2. Crie e salve os arquivos `index.html` e `index.css` dentro dessa nova pasta.

### `public/index.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Lojinha da Vovó - Painel Cliente</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1>Lojinha da Vovó - Sistema de Comunicação</h1>
    
    <div class="container">
        <h3>1. Consulta de Reposição de Estoque</h3>
        <p>Verifique o que a Dispensa Básica precisa que seja produzido.</p>
        <button onclick="verificarEstoque()">Verificar Necessidades</button>
        <div id="resultadoEstoque" class="resultado">Aguardando requisição...</div>
    </div>

    <div class="container">
        <h3>2. Envio de Bilhetes (Mensagens Gerais)</h3>
        <p>Envie um recado avulso para a Servidorina.</p>
        <label for="inputMensagem">Bilhete:</label>
        <input type="text" id="inputMensagem" placeholder="Ex: vouPrepararEEnviar">
        <button onclick="enviarMensagem()">Enviar com Internetina</button>
        <div id="resultadoMensagem" class="resultado">Aguardando resposta da vovó...</div>
    </div>

    <script>
        const enderecoServidor = 'localhost';
        const porta = '3001';

        // Requisição GET para buscar dados
        async function verificarEstoque() {
            try {
                const response = await fetch(`http://${enderecoServidor}:${porta}/api/estoque`);
                const data = await response.json();

                if (data.sucesso) {
                    let html = '<strong>Itens a serem repostos:</strong><br><ul>';
                    for (const [item, quantidade] of Object.entries(data.dados_reposicao)) {
                        html += `<li>${item}: ${quantidade} unidades</li>`;
                    }
                    html += '</ul>';
                    document.getElementById('resultadoEstoque').innerHTML = `<div class="sucesso">${html}</div>`;
                } else {
                    document.getElementById('resultadoEstoque').innerHTML = `<span class="erro">Erro ao acessar a Dispensa.</span>`;
                }
            } catch (error) {
                document.getElementById('resultadoEstoque').innerHTML = '<span class="erro">Erro de Conexão com a Internetina!</span>';
            }
        }

        // Requisição POST para enviar dados (JSON)
        async function enviarMensagem() {
            const mensagem = document.getElementById('inputMensagem').value.trim();
            if (!mensagem) return alert('Não envie bilhetes em branco!');

            const bilheteJSON = { mensagem: mensagem };

            try {
                const response = await fetch(`http://${enderecoServidor}:${porta}/api/mensagens`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bilheteJSON)
                });

                const data = await response.json();

                if (data.status === "sucesso") {
                    document.getElementById('resultadoMensagem').innerHTML = `<div class="sucesso"><strong>A vovó respondeu:</strong> ${data.mensagem}</div>`;
                } else {
                    document.getElementById('resultadoMensagem').innerHTML = `<span class="erro">${data.mensagem}</span>`;
                }
            } catch (error) {
                document.getElementById('resultadoMensagem').innerHTML = '<span class="erro">Erro na comunicação com a Servidorina.</span>';
            }
        }
    </script>
</body>
</html>
```

### `public/index.css`
```css
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fafafa;
}

.container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h1 {
    color: #cc0000;
    text-align: center;
}

h3 {
    color: #333;
    margin-top: 0;
    border-bottom: 2px solid #cc0000;
    padding-bottom: 5px;
}

label {
    display: inline-block;
    width: 120px;
    font-weight: bold;
}

input {
    padding: 8px;
    margin: 5px 0;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px 15px;
    margin: 5px 0;
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background-color: #990000;
}

.resultado {
    margin-top: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px dashed #ccc;
    border-radius: 4px;
    min-height: 50px;
}

.erro { color: #cc0000; font-weight: bold; }
.sucesso { color: #2e7d32; }
ul { margin: 10px 0 0 0; padding-left: 20px; }
```

---

## Passo 5: Colocando a Internetina para Correr (Testes Finais)

Chegou a hora da verdade. Vamos iniciar a comunicação e ver a arquitetura funcionando!

1. No terminal, certifique-se de estar na raiz do projeto e execute o comando `node server.js` (ou `npm start`).
2. Verifique se a mensagem **"Servidorina atenta na porta 3001"** aparece no console.
3. Abra o arquivo `public/index.html` no seu navegador (recomendamos a utilização da extensão **Live Server** do VS Code).
4. Clique no botão de verificar o estoque. Se a tabela aparecer calculada na tela, parabéns: o **Cliente** pediu, o **Servidor** aplicou a regra de negócio e consultou o **Banco de Dados** corretamente!
5. Digite um recado no campo inferior e clique em enviar. Inspecione a aba **Network (Rede)** no console do seu navegador para visualizar o bilhete **JSON** trafegando.

Boa codificação a todos! E lembrem-se da principal lição de Arquitetura de Software: **Ninguém entra direto no Banco de Dados sem antes passar pela requisição do Servidor!**
