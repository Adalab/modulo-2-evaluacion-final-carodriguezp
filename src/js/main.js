'use strict';

//CREAR CONSTANTES

const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-button-search");
const buttonReset = document.querySelector(".js-button-reset");


//OBTENER DATOS DE LA API
let seriesList = [];

function getDataApi(searchValue) {
    const url = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    fetch(url)
        .then(response => response.json()) //recibo mi respuesta y la convierto en JSON
        .then(data => { //obtengo esos datos
            // console.log(data[0].data.images.jpg.image_url, data.data[0].title)

            renderSeries(data.data)

        }
        )
}


function renderSeries(seriesArray) {

    const listContainer = document.querySelector(".js-result-list-container");
    const list = `<ul class="js-container-results"></ul>`;
    listContainer.innerHTML = list;
    const containerResults = document.querySelector(".js-container-results");


    for (let i = 0; i < seriesArray.length; i++) {

        containerResults.innerHTML += `<li>
                                        <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                                        <p>${seriesArray[i].title}</p>
                                    </li>`;

    }

}

function handleClick(event) {

    event.preventDefault();

    if (inputSearch.value) {
        getDataApi(inputSearch.value);
    }
}


buttonSearch.addEventListener('click', handleClick)