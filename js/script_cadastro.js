const URL_PLANILHA =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZbkWAgGCVath4Xue9VwDiSrzrtzuccvn28zXV-MLDYlRFXkpEfrcLYQeu0-dOtdPVynaUM0JgmkGs/pub?gid=0&single=true&output=csv";

const URL_APPS_SCRIPT =
    "https://script.google.com/macros/s/AKfycbwoAzIlZQ95CdKZDlT1ehj-STZI8bH7333gSGr1zhiz7E7JIU7YNwkxp6vUMdQXINLP/exec";


// ========================================
// CARREGAR DADOS DA PLANILHA
// ========================================

async function carregarDados() {

    try {

        const resposta = await fetch(URL_PLANILHA);

        if (!resposta.ok) {
            throw new Error("Não foi possível acessar a planilha.");
        }

        const texto = await resposta.text();

        criarTabela(texto);

    } catch (erro) {

        console.error(erro);

        document.getElementById("tabela-container").textContent =
            "Erro ao carregar os dados.";
    }
}


// ========================================
// CRIAR TABELA
// ========================================

function separarCSV(linha) {
    return linha.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        .map(valor => valor.replace(/^"|"$/g, ""));
}

function criarTabela(csv) {

    const linhas = csv.trim().split("\n");

    const tabela = document.createElement("table");

    // Cabeçalho
    const cabecalho = document.createElement("thead");

    const linhaCabecalho = document.createElement("tr");

    const colunas = separarCSV(linhas[0]);
    //const colunas = linhas[0].split(",");

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

        //const dados = linhas.slice(1).map(linha => separarCSV(linha));
        const valores = separarCSV(linhas[i]);
        //const valores = linhas[i].split(",");

        valores.forEach(function (valor) {

            const td = document.createElement("td");

            td.textContent = valor;

            linha.appendChild(td);
        });

        corpo.appendChild(linha);
    }

    tabela.appendChild(corpo);


    const container =
        document.getElementById("tabela-container");

    container.innerHTML = "";

    container.appendChild(tabela);
}


// ========================================
// GRAVAR NOVO REGISTRO
// ========================================

document
    .getElementById("formulario")
    .addEventListener("submit", async function (evento) {

        evento.preventDefault();

        const mensagem =
            document.getElementById("mensagem");

        mensagem.textContent = "Gravando...";


        const dados = {

            id: document.getElementById("id").value,

            nome: document.getElementById("nome").value,

            cidade: document.getElementById("cidade").value
        };


        try {

            const resposta = await fetch(URL_APPS_SCRIPT, {
                method: "POST",
                body: new URLSearchParams({
                    id: dados.id,
                    nome: dados.nome,
                    cidade: dados.cidade
                })
            });
            
            const resultado = await resposta.json();

            if (resultado.sucesso) {

                mensagem.textContent =
                    "Registro gravado com sucesso!";

                document
                    .getElementById("formulario")
                    .reset();

                carregarDados();

            } else {

                mensagem.textContent =
                    "Erro: " + resultado.erro;
            }


        } catch (erro) {

            console.error(erro);

            mensagem.textContent =
                "Erro ao gravar o registro.";
        }

    });


// ========================================
// INICIAR
// ========================================

carregarDados();
