const botao = document.getElementById("btnOlaMundo");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent = "Olá Mundo!";
});
