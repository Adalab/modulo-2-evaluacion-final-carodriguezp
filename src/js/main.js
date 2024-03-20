'use strict';

//CREAR CONSTANTES

const inputSearch = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-button-search");
const buttonReset = document.querySelector(".js-button-reset");
const buttonRemoveAllFav = document.querySelector(".js-button-delete-all-fav");

const totalNumberResults = document.querySelector(".js-total-number-results");


let animesList = [];

//OBTENER DATOS DE LA API
function getDataApi(searchValue) {
    const url = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    fetch(url)
        .then(response => response.json()) //recibo mi respuesta y la convierto en JSON
        .then(data => { //obtengo esos datos
            animesList = data.data;
            renderSeries(animesList)
        }
        )
}

//FUNCION RENDER SERIES BUSQUEDA
function renderSeries(seriesArray) {

    const containerResults = document.querySelector(".js-container-results");
    containerResults.innerHTML = "";
    const favoriteAnimes = readDataLocalStorage()
    totalNumberResults.innerHTML = `Tienes ${seriesArray.length} resultados en total`;
    ///// //AÑADIR STILO FAVORITE AL LI QUE SEA FAVORITE EN EL LOCALSTORAGE

    for (let i = 0; i < seriesArray.length; i++) {

        const indexfavoriteAnimeInFav = favoriteAnimes.findIndex((anime) => anime.mal_id === seriesArray[i].mal_id);

        if (indexfavoriteAnimeInFav !== -1) { //sirve para el array vacio o para cuando ese array este lleno pero no tenga ese elemento i

            containerResults.innerHTML += `<li class="container__section-results-div_list-results-element js-element-list favorite-anime" id="${seriesArray[i].mal_id}">
                <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                <p>${seriesArray[i].title}</p>
                <p>${seriesArray[i].title}</p>
                <p>${seriesArray[i].aired.string}</p>

            </li>`;


        } else {
            containerResults.innerHTML += `<li class="container__section-results-div_list-results-element js-element-list" id="${seriesArray[i].mal_id}">
                <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                <p>${seriesArray[i].title}</p>
                <p>${seriesArray[i].title}</p>
                <p>${seriesArray[i].aired.string}</p>
            </li>`;
        }

        ///CONDICIONAL IMAGEN--> la hago independientemente de los que evaluan el FIND INDEX porque siempre tengo que mirar lo de la imagen

        if (seriesArray[i].images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {

            seriesArray[i].images.jpg.image_url = 'https://placehold.co/200x300?text=Not+Found';
        }

    }

    listenerAnimes()

    counterResults(animesList)

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

        containerFavorite.innerHTML += `<li class="container__section-favorite-div favorite-anime" id="${seriesArray[i].mal_id}">
                                            <img src="${seriesArray[i].images.jpg.image_url}" alt="Foto de la portada de ${seriesArray[i].title}">
                                            <p>${seriesArray[i].title}</p>
                                            <i id="${seriesArray[i].mal_id}" class="fa-solid fa-square-xmark js-button-remove-favorite"></i>
                                        </li>`;
        ///CONDICIONAL IMAGEN

        if (seriesArray[i].images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {

            seriesArray[i].images.jpg.image_url = 'https://placehold.co/200x300?text=Not+Found';
        }

    }
    listenerAnimes()
    listenerRemoveIcon()


    if (!seriesArray.length) { //si no tengo largo de array es porque no hay array
        buttonRemoveAllFav.classList.add('hidden')
    } else {
        buttonRemoveAllFav.classList.remove('hidden')
    }
}

/*PARA CREAR FUNCION FAVORITOS */
function handleAddFavoriteAnime(event) {

    const favoriteAnimes = readDataLocalStorage();//esa variable llamará a la función de leer LS

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
    setDataLocalStorage(favoriteAnimes)
    renderSeries(animesList)


    buttonRemoveAllFav.classList.remove('hidden')
}

///FUNCION LISTENER DE CADA LI
function listenerAnimes() {

    const animesList = document.querySelectorAll(".js-element-list"); //CREAR ARRAY//SON LIs 

    for (const oneAnime of animesList) {//LISTENER DE CADA LI MEDIANTE UN BUCLE

        oneAnime.addEventListener('click', handleAddFavoriteAnime);
    }
}

//HACER FUNCIÓN PARA PEDIR LOS DATOS AL LOCAL STORAGE (SIEMPRE SERÁ UN STRING) Y EJECUTARLO AL CARGAR LA PAGINA
function showDataLocalStorage() {

    const datafavoriteAnimesLocal = readDataLocalStorage() ///para leer los datos del LS
    //si no hay nada el servidor nos devuelve NULL
    if (datafavoriteAnimesLocal !== null) {//SI tenemos datos en el local estorage
        //modificamos el array de favoriteAnimes

        renderFavoriteSeries(datafavoriteAnimesLocal) //volvemos a renderizar para pintar los datos que nos lleguen desde la API

    } else {
        getDataApi();//que es la función que obtiene los datos de la API para que luego se pinten
    }
}

showDataLocalStorage()
////FUNCION PARA LEER LOS DATOS DEL LOCAL STORAGE

function readDataLocalStorage() {

    if (!localStorage.getItem("FavoriteAnimes")) {
        return [] //para que no de error cuando el elemento no exista aún 
    }
    return JSON.parse(localStorage.getItem("FavoriteAnimes"));
}

function setDataLocalStorage(dataArray) {
    localStorage.setItem("FavoriteAnimes", JSON.stringify(dataArray));
}

//RESET BUTTON

function handleReset(event) {

    event.preventDefault();

    //remover elementos del local storage

    localStorage.removeItem('FavoriteAnimes');
    //limpiar pantalla
    const containerFavorite = document.querySelector(".js-container-favorite");
    containerFavorite.innerHTML = "";
    const containerResults = document.querySelector(".js-container-results");
    containerResults.innerHTML = "";
    //limpiar input
    inputSearch.value = "";
    buttonRemoveAllFav.classList.add('hidden');///EL BOTON 
    //limpiar p number of results
    totalNumberResults.innerHTML = "";
}

buttonReset.addEventListener('click', handleReset)

///borrar un li favorito
//los iconos


function handleRemoveOneFav(event) {
    //eliminar elemento li del container fav

    const favoriteAnimes = readDataLocalStorage();
    const favoriteId = parseInt(event.currentTarget.id);///id del icono, que es el id del li

    //vamos a encontrar el anime  con find

    //VALIDACIÓN para ver si está ya en favoritos o no para pintarla o no
    const filteredFavorites = favoriteAnimes.filter((favoriteAnime) => favoriteAnime.mal_id !== favoriteId); //id LS vs ID ICON

    //PARA GUARDAR LA LISTA DE FAVORITOS EN EL LOCALSTORAGE
    setDataLocalStorage(filteredFavorites)
    renderSeries(animesList)
    renderFavoriteSeries(filteredFavorites)

}


function listenerRemoveIcon() {
    const iconRemoveFav = document.querySelectorAll(".js-button-remove-favorite");

    for (const oneIcon of iconRemoveFav) {//LISTENER DE CADA i MEDIANTE UN BUCLE

        oneIcon.addEventListener('click', handleRemoveOneFav);
    }
}


//borrar todos los favoritos


function handleRemoveAllFav() {


    localStorage.removeItem("FavoriteAnimes");

    renderSeries(animesList)

    renderFavoriteSeries([]) //le paso un aray vacio para que no se renderice nada

}

buttonRemoveAllFav.addEventListener('click', handleRemoveAllFav)


function counterResults(seriesArray) {

    let arrayExam = [2, 5, 9];

    for (let i = 0; i < arrayExam.length; i++) {

        if (seriesArray.length < arrayExam[i]) {

            console.log(`La longitud del array es menor que ${arrayExam[i]}`)
        }

        else if (seriesArray.length > arrayExam[i]) {
            console.log(`La longitud del array es mayor que ${arrayExam[i]}`)
        }

        else {
            console.log(`La longitud del array es igual que ${arrayExam[i]}`)
        }
    }
}


totalNumberResults.addEventListener('click', counterResults)