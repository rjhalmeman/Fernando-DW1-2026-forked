# Chapeuzinho Vermelho e a Arquitetura Cliente-Servidor

## Introdução

Era uma vez uma menina muito rápida chamada **Internetina do Chapeuzinho Vermelho**.

Sua mãe, **Maria Clientina da Silva**, uma famosa fabricante de quitutes da região.

Do outro lado da floresta morava sua avó, **Servidorina da Lojinha**, responsável por administrar a loja de Quitutes do vilarejo e gerenciar o estoque. Registrando tudo que acontecia em sua dispensa chamada **Dispensa Básica (DB)**.

A **Dispensa Básica (DB)** era organizada como ninguém jamais tinha visto. Lá estavam registrados em uma tabela chamada `produto`, os bolos, doces, balas e pães da lojinha. Na tabela havia 6 colunas: o `id_produto`, o `nome_produto`, a `quantidade_produto`, a `quantidade_minima_produto` e a `quantidade_maxima_produto`.

Internetina tinha uma missão muito importante: transportar bilhetes entre a mãe e a avó.

Ela nunca abria os bilhetes. Apenas entregava. Afinal, **mensageiros não tomam decisões**. Eles apenas transportam mensagens.

Mas havia um problema.

Na floresta vivia o terrível **Lobo Hacker Mau**, que adorava interceptar mensagens, roubar dados e causar confusão. Sabendo disso, a mãe e a avó já começaram a conversar sobre como melhorar a **segurança das mensagens** no futuro, embora, por enquanto, o sistema delas ainda fosse vulnerável.

---

## Conhecendo os Personagens

| Personagem | Representa |
|------------|------------|
| **Maria Clientina da Silva** | Cliente (Frontend) |
| **Internetina do Chapeuzinho Vermelho** | Internet |
| **Servidorina da Lojinha** | Servidor (Backend) |
| **Dispensa Básica (DB)** | Banco de Dados |
| **Lobo Hacker Mau** | Ameaças de Segurança (Vulnerabilidades) |
| **Bilhetes** | Mensagens JSON |
| **Verificação de origem** | CORS |
| **Envelope Aberto** | HTTP (Texto Limpo - Vulnerável) |

---

## O Pedido de Informação (Funcionamento do Sistema)

Certa manhã, Maria Clientina queria saber como estava o estoque da lojinha.

Ela escreveu um bilhete formatado como um **JSON**:

```json
{
    "mensagem": "situacaoEstoque"
}
```

E entregou para Internetina do chapeu vermelho.

— Leve este pedido para sua avó!

Internetina correu pela floresta e chegou à casa da vovó.

Servidorina recebeu o bilhete e realizou sua única **verificação de segurança** atual.

Ela verificou:

— Este bilhete veio realmente da Clientina? Essa verificação era chamada de **CORS**, uma forma elegante de dizer: *"Só aceito mensagens de remetentes autorizados"*.

Depois, ela suspirou preocupada. Ela sabia que o bilhete havia viajado em um **Envelope Aberto (HTTP)**. Isso significava que, durante o trajeto pela floresta, a mensagem viajou em texto limpo. Qualquer um poderia ter lido o conteúdo. Como a implementação de uma proteção mais forte estava agendada apenas para as próximas atualizações do sistema, ela precisou confiar no bilhete e processar o pedido.

---

## Consultando o Banco de Dados

Servidorina foi até a sua **Dispensa Básica (DB)**, informou as **credenciais de acesso** e abriu a porta.

Após consultar os registros, encontrou a seguinte situação:

| id_produto | nome_produto | quantidade_produto | quantidade_minima_produto | quantidade_maxima_produto | 
|------------|--------------|--------------------|---------------------------|----------------------|
| 1 | Bolo | 2 | 3 | 10 |
| 2 | Doce | 3 | 5 | 10 |
| 3 | Bala | 7 | 10 | 15 | 
| 4 | Pão | 18 | 20 | 50 | 

Ela então aplicou as **Regras de Negócio** da lojinha para preencher as informações.

### Regras de Negócio

Para cada produto cadastrado na tabela:

- Se a **quantidade_produto** for menor que a **quantidade_minima_produto**, o produto deve ser reposto.
- A quantidade a ser solicitada é calculada pela fórmula matemática simples: quantidade máxima do produto menos a quantidade do produto.

Com os cálculos já processados em sua tabela, Servidorina escreveu outro bilhete de **resposta**:

```json
{
    "bolos": 8,
    "doces": 7,
    "balas": 8,
    "paes": 32
}
```

Dessa forma, a decisão não está escrita rigidamente no programa do Cliente. As informações são obtidas do **Banco de Dados** e as regras de negócio são **aplicadas dinamicamente pelo Servidor**.

E entregou para Internetina.

---

## A Resposta da avó Servidorina e a Vulnerabilidade

Internetina voltou correndo pela floresta.

No caminho ela ouviu um uivo.

*Auuuuuuuuuuuu!*

Era o Lobo Hacker Mau.

— Deixe-me ver esse bilhete! — exigiu o lobo.

— Nem pensar! — respondeu Internetina, tentando esconder o papel.

Mas como o bilhete viajava em um **Envelope Aberto (HTTP)**, o Lobo nem precisou tomar o papel da mão dela. Ele apenas espiou por cima do ombro de Internetina e leu tudo em texto claro.

— Hum... então a lojinha da vovó está com o estoque baixo e ela precisa de 32 pães e 8 bolos... Informação muito valiosa para os meus negócios na floresta! — riu o Lobo.

Internetina continuou correndo, assustada por não conseguir proteger a privacidade da mensagem.

Ao chegar em casa, entregou o bilhete para Maria Clientina e relatou o problema:

— Mãe, o Lobo leu a nossa mensagem! Nossa comunicação está vulnerável. Ele interceptou os dados no meio do caminho!

A mãe leu a resposta (**Frontend recebendo os dados do Backend**) e suspirou.

— Você tem razão, Internetina. Atualmente estamos enviando tudo em texto limpo. No futuro, nós precisaremos implementar um **Envelope Mágico (HTTPS)**. Ele vai criptografar nossos bilhetes para que, mesmo que o Lobo olhe para eles, enxergue apenas um monte de letras embaralhadas. Mas isso é um projeto para o futuro. Por enquanto, vamos preparar os produtos!

Ela imediatamente começou a fabricar os quitutes.

---

## Preparando a Resposta

Enquanto preparava tudo, Maria Clientina escreveu outro bilhete (**Nova Requisição**):

```json
{
    "mensagem": "vouPrepararEEnviar"
}
```

E entregou para Internetina, torcendo para o Lobo não estar olhando de novo.

Internetina atravessou novamente a floresta e entregou a mensagem para Servidorina.

A vovó leu o bilhete e respondeu com um **Status Code**:

```json
{
    "status": "sucesso",
    "mensagem": "pedidoRecebido"
}
```

Ao receber essa resposta, Maria Clientina ficou tranquila. A comunicação havia funcionado corretamente, mesmo com os riscos estruturais da floresta.

---

## Situação Inusitada

Alguns dias depois, o Lobo Hacker Mau tentou entrar diretamente na Dispensa Básica.

Ao chegar à porta, Servidorina perguntou:

— Quem é você?

— Sou o usuário final.

— E o que deseja?

— Quero acessar diretamente o **Banco de Dados**.

Servidorina arregalou os olhos.

— O QUÊ?!

— Quero consultar a tabela de bolos.

— E passou pelo **Cliente**?

— Não.

— Enviou uma **Requisição**?

— Não.

— Recebeu **Autorização**?

— Não.

— Então está tudo errado!

— Mas por quê?

Servidorina respondeu cruzando os braços:

— Porque aqui seguimos uma **Arquitetura Cliente-Servidor**!
* O **Cliente** faz a requisição.
* O **Servidor** processa.
* O **Banco de Dados** armazena as informações.
* **Ninguém entra diretamente no banco de dados.**

O Lobo abaixou as orelhas.

— Então vou precisar falar com a Clientina primeiro?

— Exatamente.

— E enviar um JSON?

— Exatamente.

— E esperar a resposta?

— Exatamente.

— Que burocracia...

— Nós chamamos isso de **Arquitetura de Software**. Pode até não termos o HTTPS ainda, mas regras de acesso nós temos!

---

## Fazendo a Relação com a Tecnologia

Na história, os personagens representam os componentes reais de uma aplicação web.

### Cliente (Frontend)

A **Maria Clientina** representa o sistema que o usuário utiliza (a interface visual).

Exemplos:
* HTML
* CSS
* JavaScript


Ela é responsável por criar os pedidos.

---

### Internet e Vulnerabilidades

A **Internetina** representa a **rede** que transporta as mensagens. Atualmente, ela utiliza o **Protocolo HTTP**. E não HTTPS, que seria o ideal.

> **O Lobo Hacker Mau e o perigo do HTTP:**
> Como o HTTP transporta os dados em "texto limpo" (sem criptografia), qualquer agente malicioso (o Lobo) que intercepte a rede no meio do caminho pode ler as mensagens. Isso é conhecido na segurança da informação como ataque **Man-in-the-Middle** (Homem do Meio).

**O Futuro (HTTPS):**
No futuro, o sistema implementará o **HTTPS** (Hyper Text Transfer Protocol Secure). O "S" no final representa o *Envelope Mágico* da criptografia. Quando ele for implementado, mesmo que o Lobo intercepte a mensagem, ele só verá dados criptografados e ilegíveis, garantindo a total privacidade da comunicação.

---

### JSON

Os bilhetes representam mensagens no formato **JSON (JavaScript Object Notation)**, o padrão universal para troca de dados.

Exemplo:

```json
{
    "mensagem": "situacaoEstoque"
}
```

Faça um projeto, usando HTML, CSS, JS no frontend e nodeJS e postgresql no backend. Elabore as telas
que serão usadas para comunicação entre o cliente e o servidor de modo que mensagens sejam separadas
das comunicações sobre o estoque.

Usar como base o projeto modelo que está no github. [link](https://github.com/rjhalmeman/dw1-2026/tree/main/2-bimestre/2026-06-02%20-%20dw%20e%20bd)

Sejam criativos na estilização, adicionem imagens.

Ao concluir, suba seu projeto para o github.

Envie o link github para: https://forms.gle/orN81F6WqvW5L3rk8
