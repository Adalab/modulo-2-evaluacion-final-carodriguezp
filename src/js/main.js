'use strict';

//CREAR CONSTANTES

const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-button-search");
const buttonReset = document.querySelector(".js-button-reset");


//OBTENER DATOS DE LA API
let animesList = [];
let favoriteAnimes = [];

function getDataApi(searchValue) {
    const url = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    fetch(url)
        .then(response => response.json()) //recibo mi respuesta y la convierto en JSON
        .then(data => { //obtengo esos datos
            // console.log(data[0].data.images.jpg.image_url, data.data[0].title)
            animesList = data.data;
            renderSeries(animesList)

        }

        )
}

//FUNCION RENDER SERIES BUSQUEDA
function renderSeries(seriesArray) {

    const containerResults = document.querySelector(".js-container-results");
    containerResults.innerHTML = "";

    for (let i = 0; i < seriesArray.length; i++) {

        containerResults.innerHTML += `<li class="js-element-list" id="${seriesArray[i].mal_id}">
                                            <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                                            <p>${seriesArray[i].title}</p>
                                        </li>`;
        ///CONDICIONAL IMAGEN

        if (seriesArray[i].images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {

            seriesArray[i].images.jpg.image_url = 'https://placehold.co/200x300?text=Not+Found';
        }

    }
    listenerAnimes()
}
function handleClick(event) {

    event.preventDefault();

    if (inputSearch.value) {
        getDataApi(inputSearch.value);
    }
}


buttonSearch.addEventListener('click', handleClick)

///////////////FAVORITOS

function renderFavoriteSeries(seriesArray) {

    const containerFavorite = document.querySelector(".js-container-favorite");
    containerFavorite.innerHTML = "";

    //RENDERIZAR ELEMENTOS EN EL CONTAINER DE FAVORITOS
    for (let i = 0; i < seriesArray.length; i++) {

        containerFavorite.innerHTML += `<li class="js-element-list" id="${seriesArray[i].mal_id}">
                                            <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                                            <p>${seriesArray[i].title}</p>
                                        </li>`;
        ///CONDICIONAL IMAGEN

        if (seriesArray[i].images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {

            seriesArray[i].images.jpg.image_url = 'https://placehold.co/200x300?text=Not+Found';
        }

    }
    listenerAnimes()
}

/*PARA CREAR FUNCION FAVORITOS */
function handleAddFavoriteAnime(event) {

    const idAnimeClicked = parseInt(event.currentTarget.id);



    //vamos a encontrar el anime  con find
    const favoriteAnimeId = animesList.find((anime) => idAnimeClicked === anime.mal_id); //que el id del anime que selecciono sea igual que el id del anime del array donde busca



    //VALIDACIÓN para ver si está ya en favoritos o no para pintarla o no
    const indexfavoriteAnimeInFav = favoriteAnimes.findIndex((anime) => anime.mal_id === idAnimeClicked);

    if (indexfavoriteAnimeInFav === -1) {

        favoriteAnimes.push(favoriteAnimeId); //para meter ese anime en el array de paletas favoritas
    }

    renderFavoriteSeries(favoriteAnimes)

    //PARA GUARDAR LA LISTA DE FAVORITOS EN EL LOCALSTORAGE
    localStorage.setItem("FavoriteAnimes", JSON.stringify(favoriteAnimes));
}

///FUNCION LISTENER DE CADA LI
function listenerAnimes() {

    const animesList = document.querySelectorAll(".js-element-list"); //CREAR ARRAY//SON LIs 

    for (const oneAnime of animesList) {//LISTENER DE CADA LI MEDIANTE UN BUCLE

        oneAnime.addEventListener('click', handleAddFavoriteAnime);
    }
}



//HACER FUNCIÓN PARA PEDIR LOS DATOS AL LOCAL STORAGE (SIEMPRE SERÁ UN STRING) Y EJECUTARLO AL CARGAR LA PAGINA
function getDataLocalStorage() {

    const datafavoriteAnimesLocal = JSON.parse(localStorage.getItem("FavoriteAnimes")) //FavoriteAnimes es el nombre que le di al guardar en el local storage
    //si no hay nada el servidor nos devuelve NULL
    if (datafavoriteAnimesLocal !== null) {//SI tenemos datos en el local estorage
        //modificamos el array de favoriteAnimes
        favoriteAnimes = datafavoriteAnimesLocal; //para que coja los datos del localStorage
        renderFavoriteSeries(datafavoriteAnimesLocal) //volvemos a renderizar para pintar los datos que nos lleguen desde la API

    } else {
        getDataApi();//que es la función que obtiene los datos de la API para que luego se pinten
    }
}

getDataLocalStorage()


//RESET BUTTON

function handleReset(event) {

    event.preventDefault();

    //remover elementos del local storage
    favoriteAnimes = [];
    localStorage.removeItem('FavoriteAnimes');
    //limpiar pantalla
    const containerFavorite = document.querySelector(".js-container-favorite");
    containerFavorite.innerHTML = "";
    const containerResults = document.querySelector(".js-container-results");
    containerResults.innerHTML = "";
    //limpiar input
    inputSearch.value = "";
}


buttonReset.addEventListener('click', handleReset)
