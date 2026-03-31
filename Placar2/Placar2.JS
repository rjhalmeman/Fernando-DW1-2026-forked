let pontosA = 0;
let pontosB = 0;

// Atualizar nomes dinamicamente
const inputA = document.getElementById("timeA");
const inputB = document.getElementById("timeB");

inputA.addEventListener("input", () => {
    document.getElementById("nomeA").textContent = inputA.value || "Time A";
});

inputB.addEventListener("input", () => {
    document.getElementById("nomeB").textContent = inputB.value || "Time B";
});

// Funções de pontuação
function somarA() {
    pontosA++;
    atualizar();
}
function somarB() {
    pontosB++;
    atualizar();
}
function somarAminus() {
    if (pontosA > 0) pontosA--;
    atualizar();
}
function somarBminus() {
    if (pontosB > 0) pontosB--;
    atualizar();
}

function atualizar() {
    document.getElementById("pontosA").textContent = pontosA;
    document.getElementById("pontosB").textContent = pontosB;

    document.getElementById("mensagem").textContent = `Placar atualizado: ${pontosA} x ${pontosB}`;
}

// Resetar tudo
function resetar() {
    pontosA = 0;
    pontosB = 0;
    document.getElementById("mensagem").textContent = "Inicie o jogo";
    atualizar();
}
