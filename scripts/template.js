function pokemonTemplate(uniqId, pokemonDetail) {
    return `<div class="pokemon-card">
                <div onclick="showModal(${uniqId})" class="pokemon">
                    <div class="pokemon-header hf-bg-${pokemonDetail.types[0].type.name}">
                        <span>#${uniqId}</span>
                        <h2>${pokemonDetail.name}</h2>
                        <span></span>
                    </div>
                    <div class="pokemon-image bg-${pokemonDetail.types[0].type.name}">
                        <img class="front-image" src="${pokemonDetail['sprites']['other']['official-artwork']['front_default']}" alt="${pokemonDetail.name}">
                        <img class="back-image" src="${pokemonDetail['sprites']['other']['dream_world']['front_default']}" alt="${pokemonDetail.name}">
                    </div>
                    <div class="pokemon-footer hf-bg-${pokemonDetail.types[0].type.name} pokemon-type-${uniqId}">
                        
                    </div>
            </div>
        </div>`;
}


function pokemonTypeTemplate(pokemonType) {
    return `<img src="${pokemonType['sprites']['generation-viii']['legends-arceus']['name_icon']}" alt="${pokemonType.name}"></img>`;
}


function pokemonModalTemplate(pokemonDetail, uniqId) {
    return `<div class="modal-container hf-bg-${pokemonDetail.types[0].type.name}">
                <div class="header-modal">
                   <h1>#${pokemonDetail.name}</h1>
                    <img src="./img/close.png" onclick="hideModal()" alt="close" class="close-icon" id="close">
                </div>
                <div class="main-modal">
                    <img src="./img/previous.png" alt="previous" class="np-icon" id="previous" onclick="showModal(${getPreviousUinqId(uniqId)})">
                    <img src="${pokemonDetail['sprites']['other']['official-artwork']['front_default']}" alt="">
                    <img src="./img/next.png" alt="next" class="np-icon" id="next" onclick="showModal(${getNextUinqId(uniqId)})">
                </div>
                <div class="types pokemon-type-${uniqId}">
                </div>
                <div class="discription">
                    <table>
                        <tr>
                            <td> weight :</td>
                            <td> ${pokemonDetail.weight}</td>  
                        </tr>
                        <tr>
                            <td>height :</td>
                            <td> ${pokemonDetail.height}</td>  
                        </tr>
                        <tr>
                            <td>base experience :</td>
                            <td> ${pokemonDetail.base_experience}</td>
                        </tr>
                    </table>
                </div>
            </div>`;
}