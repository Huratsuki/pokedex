var listaPokemons = []

getPokemons();

async function getPokemons() {
    fetch("http://localhost:3000/pokemon")
        .then(function (res) { return res.json(); })
        .then(function (pokemons) {
            listaPokemons = pokemons;
            iniciar();
        })
        .catch(err => {
            console.error(err);
        });
}

function salvar(event) {
    event.preventDefault();
    var adicionarPokemon = {

        nome: document.getElementById("nome").value,
        tipo: document.getElementById("tipo").value,
        imagem: document.getElementById("imagem").value,
    }

    if (validarTipo()) {
        fetch("http://localhost:3000/pokemon", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adicionarPokemon),
        })
            .then(function (res) { return res.json(); })
            .then(function (adicionarPokemon) { alert(JSON.stringify(adicionarPokemon)) })
            .catch(err => {
                console.error(err);
            });
        listaPokemons.push(adicionarPokemon);
        insertTable(adicionarPokemon);
        limparCampos();
        nome.focus();
        getPokemons();
    }
    else
        alert("Selecione o tipo do pokemon");
}

function insertTable(pokemon) {

    var tbody = document.getElementById("t-body");
    var tr = tbody.insertRow();

    var tdNome = tr.insertCell();
    tdNome.innerText = pokemon.nome;

    let tdTipo = tr.insertCell();
    var badge = document.createElement("span");
    badge.className = pokemon.tipo;
    badge.id = "badge"
    badge.innerText = pokemon.tipo;
    tdTipo.appendChild(badge);

    let tdImagem = tr.insertCell()
    var img = document.createElement("img");
    img.src = `${pokemon.imagem}`;
    img.style.height = '60px';
    tdImagem.appendChild(img);

    let tdRemover = tr.insertCell();
    tdRemover.className = "align-remove-button";

    var button = document.createElement("a");
    button.innerHTML = "<i class='fa-solid fa-trash fa-xl'></i>";
    button.title = "Remover pokemon";
    button.id = "removeButton"
    button.onclick = function () {
        deletarPokemon(pokemon._id);
        window.location.reload();
    }
    tdRemover.appendChild(button);
}


function limpar() {
    var tbody = document.getElementById("t-body");
    tbody.innerHTML = "";
}

async function deletarPokemon(nome) {
    var confirmacao = confirm('Tem certeza que deseja excluir o pokemon?');
    if (confirmacao) {
        alert(`O pokemon foi removido da sua pokedex`);
        fetch(`http://localhost:3000/pokemon/${nome}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
            .then((res) => res.json())
            .then((json) => {
            })
    }
}

function iniciar() {
    limpar();
    for (let index = 0; index < listaPokemons.length; index++) {
        var pokemon = listaPokemons[index];
        insertTable(pokemon);
    }
}

function atualizar() {
    limpar();
    getPokemonsSalvos();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "Selecione o Tipo";
    document.getElementById("imagem").value = "";
}

function validarTipo() {
    inputTipo = document.getElementById("tipo").value;
    if (inputTipo == "Selecione o Tipo") {
        return false
    }
    else {
        return true
    }
}

function montarTipos() {
    var tipoPokemon = document.getElementById("tipo");
    var option = document.createElement("option");
    option.text = element;
    tipoPokemon.add(option);
}