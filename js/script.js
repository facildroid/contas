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

        criarTabela(texto);

    } catch (erro) {

        console.error("Erro:", erro);

        document.getElementById("tabela-container").textContent =
            "Erro ao carregar os dados.";

    }
}


function criarTabela(csv) {

    const linhas = csv.trim().split("\n");

    const tabela = document.createElement("table");

    // Cabeçalho
    const cabecalho = document.createElement("thead");
    const linhaCabecalho = document.createElement("tr");

    const colunas = linhas[0].split(",");

    colunas.forEach(function (coluna) {

        const th = document.createElement("th");

        th.textContent = coluna;

        linhaCabecalho.appendChild(th);

    });

    cabecalho.appendChild(linhaCabecalho);
    tabela.appendChild(cabecalho);

    // Dados
    const corpo = document.createElement("tbody");

    for (let i = 1; i < linhas.length; i++) {

        const linha = document.createElement("tr");

        const valores = linhas[i].split(",");

        valores.forEach(function (valor) {

            const td = document.createElement("td");

            td.textContent = valor;

            linha.appendChild(td);

        });

        corpo.appendChild(linha);
    }

    tabela.appendChild(corpo);

    // Coloca a tabela na página
    const container = document.getElementById("tabela-container");

    container.innerHTML = "";

    container.appendChild(tabela);
}

carregarDados();

