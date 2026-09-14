const botao = document.getElementById("btnOlaMundo");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent = "Olá Mundo!";
});


const URL_PLANILHA =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZbkWAgGCVath4Xue9VwDiSrzrtzuccvn28zXV-MLDYlRFXkpEfrcLYQeu0-dOtdPVynaUM0JgmkGs/pub?gid=0&single=true&output=csv";

async function carregarDados() {

    try {
        const resposta = await fetch(URL_PLANILHA);

        if (!resposta.ok) {
            throw new Error("Não foi possível acessar a planilha.");
        }

        const texto = await resposta.text();

        console.log(texto);

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

carregarDados();

