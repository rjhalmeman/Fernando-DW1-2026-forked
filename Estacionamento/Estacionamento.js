function funcaoTempo() {

    let grande = document.getElementById("VeiculoTeste").checked;
    let frequente = document.getElementById("VeiculoTesteTwo").checked;
    let tempo = parseFloat(document.getElementById("inputTempo").value);

    let tempoT = ((tempo - 1) * 2.50) + 5.00;


    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");

    if (tempoT < 5.00) {
        footer.classList.add("erro");
        mensagem.innerHTML = "O estacionamento não é seu para ser de graça";
        document.getElementById("respTempo").innerHTML = "-";

   } else {
alert(tempo)
        if (grande === true) {
            tempoT = 5.00 + (tempo + (tempo * 0.25));
            mensagem.innerHTML = "Preço total com veículo grande";
        }
        else if (frequente === true) {
            tempoT = 5.00 + (tempo - (tempo * 0.05));
            mensagem.innerHTML = "Preço como pessoa frequente";
        }
        else {
            tempoT = ((tempo - 1) * 2.50) + 5.00;
            mensagem.innerHTML = "Preço total";
        }

        footer.classList.remove("erro");
        document.getElementById("respTempo").innerHTML = tempoT.toFixed(2);
    }
}