const BASE_URL = "https://pokeapi.co/api/v2/";
let offsetNumber = 0;
const LIMIT = 20;
let pokemons = [];
let filterPokemons = [];

function init() {
    renderAll();
}

function loadMore() {
    renderAll();
}

async function getData(path = "") {
    let response = await fetch(BASE_URL + path);
    let jsonResponse = await response.json();
    return jsonResponse;
}

async function getPokemosFromApiAndSaveToArray() {
    let pokemonLimitedData = await getData(`pokemon?limit=${LIMIT}&offset=${offsetNumber}`);

    for (let i = 0; i < pokemonLimitedData.results.length; i++) {
        pokemons.push({
            id: i + 1 + offsetNumber,
            name: pokemonLimitedData.results[i].name
        });
    }
}

async function renderAll() {
    showLoading();

    await getPokemosFromApiAndSaveToArray();

    await renderPokemons();

    updateOffsetNumber();

    hideLoading();
}

async function renderPokemons() {
    for (let i = offsetNumber; i < pokemons.length; i++) {

        let uniqId = pokemons[i].id;

        let pokemonName = pokemons[i].name;

        let pokemonDetail = await getData("pokemon/" + pokemonName);
        let pokemonsElement = document.getElementById("pokemons");
        pokemonsElement.innerHTML += pokemonTemplate(uniqId, pokemonDetail);

        await renderPokemonTypes(pokemonDetail, uniqId);
    }
}

async function renderPokemonTypes(pokemonDetail, uniqId) {
    const pokemonTypeElements = document.querySelectorAll('.pokemon-type-' + uniqId);

    for (let i = 0; i < pokemonTypeElements.length; i++) {
        pokemonTypeElements[i].innerHTML = '';

        for (let j = 0; j < pokemonDetail.types.length; j++) {
            let pokemonTypeName = pokemonDetail.types[j].type.name;
            let pokemonType = await getData("type/" + pokemonTypeName);
            pokemonTypeElements[i].innerHTML += pokemonTypeTemplate(pokemonType);
        }
    }
}

async function renderFilterPokemons() {
    let filterPokemonsElement = document.getElementById("filter-pokemons");
    filterPokemonsElement.innerHTML = '';

    for (let i = 0; i < filterPokemons.length; i++) {

        let uniqId = filterPokemons[i].id;;

        let pokemonName = filterPokemons[i].name;

        let pokemonDetail = await getData("pokemon/" + pokemonName);

        filterPokemonsElement.innerHTML += pokemonTemplate(uniqId, pokemonDetail);

        await renderPokemonTypes(pokemonDetail, uniqId);

    }
}

function updateOffsetNumber() {
    offsetNumber += LIMIT;
}

function showLoading() {
    document.querySelector('body').classList.add('h-100');
    document.getElementById('loading').classList.remove('d-none');
}

function hideLoading() {
    document.getElementById('loading').classList.add('d-none');
    document.querySelector('body').classList.remove('h-100');
}

async function search() {
    let searchInputValue = document.getElementById('search-input').value;

    if (searchInputValue.length >= 3) {
        filterPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchInputValue));
        renderFilterPokemons();

        showFilterPokemons();
    } else {
        hideFilterPokemons();
    }
}

function showFilterPokemons() {
    document.getElementById('pokemons').classList.add('d-none');
    document.getElementById('filter-pokemons').classList.remove('d-none');
    document.getElementById('loadmore').classList.add('d-none');
    document.querySelector('body').classList.add('h-100');
}

function hideFilterPokemons() {
    document.getElementById('pokemons').classList.remove('d-none');
    document.getElementById('filter-pokemons').classList.add('d-none');
    document.getElementById('loadmore').classList.remove('d-none');
    document.querySelector('body').classList.remove('h-100');
}

async function showModal(uniqId) {
    let pokemonName = getPokemonNameById(uniqId);
    let pokemonDetail = await getData("pokemon/" + pokemonName);
    document.getElementById("modal").classList.remove('d-none');
    let modal = document.getElementById('modal');
    modal.innerHTML = pokemonModalTemplate(pokemonDetail, uniqId);

    await renderPokemonTypes(pokemonDetail, uniqId);
}

function hideModal() {
    document.getElementById("modal").classList.add('d-none');
}

function getPokemonNameById(id) {
    let pokemon = pokemons.find(pokemon => pokemon.id === id);
    return pokemon.name;
}

function getPreviousUinqId(id) {
    return (id === 1) ? pokemons.length : id - 1;
}

function getNextUinqId(id) {
    return (id === pokemons.length) ? 1 : id + 1;
}