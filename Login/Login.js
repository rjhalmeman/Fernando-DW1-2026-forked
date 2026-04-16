function funcaoLogin() {

    let nome = document.getElementById("inputUsername").value;
    let senha = document.getElementById("inputPassword").value;

    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");

    if (nome !== "Joao" || senha !== "Joao") {
        footer.classList.add("erro");
        mensagem.innerHTML = "Error: Username or Password incorrect";
        document.getElementById("respLogin").innerHTML = "Login Failed";

    } else {
        footer.classList.remove("erro");
        mensagem.innerHTML = "Login done with sucess!";
        document.getElementById("respLogin").innerHTML = "Acess Granted";
        window.location.href = "LoginPage2.html"
        
    }
}
