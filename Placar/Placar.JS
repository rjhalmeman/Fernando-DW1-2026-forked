let pontosA = 0;
let pontosB = 0;

function atualizarNomes() {
    let nomeA = document.getElementById("timeA").value || "Time A";
    let nomeB = document.getElementById("timeB").value || "Time B";

    document.getElementById("nomeA").innerHTML = nomeA;
    document.getElementById("nomeB").innerHTML = nomeB;
}

function somarA() {
    pontosA++;
    atualizar();
}

function somarAminus() {
    pontosA--;
    atualizar();
}

function somarB() {
    pontosB++;
    atualizar();
}

function somarBminus() {
    pontosB--;
    atualizar();
}

function resetar() {
    pontosA = 0;
    pontosB = 0;

    document.getElementById("mensagem").innerHTML = "Placar reiniciado";
    document.getElementById("footer").classList.remove("erro");

    atualizar();
}

function atualizar() {
    atualizarNomes();

    document.getElementById("pontosA").innerHTML = pontosA;
    document.getElementById("pontosB").innerHTML = pontosB;

    let mensagem = document.getElementById("mensagem");
    let footer = document.getElementById("footer");

    if (pontosA > pontosB) {
        mensagem.innerHTML = "Time A está vencendo";
        footer.classList.remove("erro");
    } 
    else if (pontosB > pontosA) {
        mensagem.innerHTML = "Time B está vencendo";
        footer.classList.add("erro");
    } 
    else {
        mensagem.innerHTML = "Empate";
        footer.classList.remove("erro");
    }
}