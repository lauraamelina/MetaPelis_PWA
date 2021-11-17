// API KEY
let API_KEY = 'df926bdd';

let inputElement = document.getElementById('busqueda');
let divInfo = document.getElementById('info');
let sendButton = document.getElementById('sendButton');
let paraVer = [];
let laPelicula;

// CONEXION A INTERNET
window.addEventListener('offline', event => {
    let conexion = d.getElementById('verificarConexion');
    conexion.className = ("offline");
    conexion.innerHTML = ('<i class="gg-shape-circle"></i> Offline');
});

window.addEventListener('online', event => {
    let conexion = d.getElementById('verificarConexion');
    conexion.className = ("online");
    conexion.innerHTML = ('<i class="gg-shape-circle"></i> Online');
});

if (!navigator.onLine) {
    let conexion = d.getElementById('verificarConexion');
    conexion.className = ("offline");
    conexion.innerHTML = ('<i class="gg-shape-circle"></i> Offline');
}

// if (localStorage.getItem("paraVer")) {
//     let listaLocalStorage = JSON.parse(localStorage.getItem("paraVer"));
//     listaLocalStorage.forEach(function(e) {
//         let peli = new Pelicula(e.titulo, e.sinopsis, e.tipo, e.anio, e.genero, e.director, e.actores, e.rating, e.poster);
//         paraVer.push(peli);
//     })
// }

// if (!localStorage.paraVer) {
//     paraVer = [];
// } else {
//     paraVer = JSON.parse(localStorage.getItem("paraVer"))
// }


// ADD EVENT LISTENER QUE ESCUCHA INPUT PELICULA

sendButton.addEventListener('click', () => {

    buscarEnApi(inputElement.value);
});


//FUNCIÓN PELICULA
function Pelicula(titulo, sinopsis, tipo, anio, genero, director, actores, rating, poster) {
    this.titulo = titulo;
    this.sinopsis = sinopsis;
    this.tipo = tipo;
    this.anio = anio;
    this.genero = genero;
    this.director = director;
    this.actores = actores;
    this.rating = rating;
    this.poster = poster;
}


// FUNCION QUE HACE EL FETCH QUE TRAE LAS PELICULAS
function buscarEnApi(pelicula) {
    fetch(`http://www.omdbapi.com/?t=${pelicula}&apikey=${API_KEY}&plot=short`)
        .then(response => response.json())
        .then(data => {

            laPelicula = new Pelicula(data.Title, data.Plot, data.Type, data.Year, data.Genre, data.Director, data.Actors, data.Ratings, data.Poster);

            madeGrid(laPelicula);

            console.log(data);

        })
        .catch(function(error) {
            console.log('Algo falló!', error);
        });
}


//FUNCION QUE MUESTRA LA PELICULA

function madeGrid(laPelicula) {
    divInfo.innerHTML = '';
    let titulo = document.createElement("h2");
    let sinopsis = document.createElement("p");
    let tipo = document.createElement("p");
    let anio = document.createElement("p");
    let genero = document.createElement("p");
    let director = document.createElement("p");
    let actores = document.createElement("p");
    let rating = document.createElement("p");
    let poster = document.createElement("img");
    let btnLista = document.createElement("a")

    titulo.innerHTML = laPelicula.titulo;
    sinopsis.innerHTML = `<span class="fw-bold">  Sinopsis: </span>${laPelicula.sinopsis} `;
    tipo.innerHTML = `<span class="fw-bold"> Tipo: </span>${laPelicula.tipo} `;
    anio.innerHTML = `<span class="fw-bold"> Año: </span>${laPelicula.anio} `;
    genero.innerHTML = `<span class="fw-bold"> Género: </span>${laPelicula.genero} `;
    director.innerHTML = `<span class="fw-bold"> Director: </span>${laPelicula.director} `;
    actores.innerHTML = `<span class="fw-bold"> Actores: </span>${laPelicula.actores} `;
    rating.innerHTML = `<span class="fw-bold"> Rating: </span>${laPelicula.rating[0].Value} `;
    poster.src = laPelicula.poster;
    btnLista.innerHTML = 'Agregar a la lista';
    btnLista.href = '#';
    btnLista.className = 'btn';
    btnLista.id = 'lista';

    divInfo.appendChild(poster);
    divInfo.appendChild(poster);
    divInfo.appendChild(titulo);
    divInfo.appendChild(sinopsis);
    divInfo.appendChild(tipo);
    divInfo.appendChild(anio);
    divInfo.appendChild(genero);
    divInfo.appendChild(director);
    divInfo.appendChild(actores);
    divInfo.appendChild(rating);
    divInfo.appendChild(btnLista);


    //CONDICION ME PERMITE HACER LAS VALIDACIONES
    for (let pelicula of paraVer) {
        if (pelicula.titulo != laPelicula.titulo) {
            btnLista.innerHTML = 'Agregar a la lista';
        } else {
            btnLista.innerHTML = 'Eliminar de la lista';
        }
    }

    btnLista.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('pelicula a agregar es: ' + laPelicula.titulo);
        // agregarALaLista();

        for (let pelicula of paraVer) {
            if (pelicula.titulo == laPelicula.titulo) {
                console.log('Ya está!');
                e.target.innerHTML = 'Agregar a la lista';
                let indice = paraVer.indexOf(pelicula);
                eliminarDeLaLista(indice);
            } else {
                console.log('No está!');
                e.target.innerHTML = 'Eliminar de la lista';
                agregarALaLista();
            }
        }




    })

}

//FUNCION QUE AGREGA A LA LISTA PARA VER
function agregarALaLista() {
    paraVer.push(laPelicula);
    localStorage.setItem('paraVer', JSON.stringify(paraVer));
}

//FUNCION QUE ELIMINA DE LA LISTA PARA VER
function eliminarDeLaLista(indice) {
    paraVer.splice(indice, 1);
    localStorage.setItem('paraVer', JSON.stringify(paraVer));
}




















// const d = document;
// const b = d.body
// const mainBuscador = d.getElementById('mainBuscador');
// const mainWatchlist = d.getElementById('mainWatchlist');
// const API_KEY = 'dc49e68f';
// const inputBusqueda = d.getElementById('inputBusqueda');
// let watchList = [];
// let peliculaActual;

// if (localStorage.getItem("watchList")) {
//     let watchListLS = JSON.parse(localStorage.getItem("watchList"));
//     watchListLS.forEach(function(element) {
//         let peliLS = new Pelicula(element.titulo, element.plot, element.tipo, element.anio, element.genero, element.director, element.actores, element.poster, element.rating);
//         watchList.push(peliLS);
//     })
// }



// function Pelicula(titulo, plot, tipo, anio, genero, director, actores, poster, rating) {
//     this.titulo = titulo;
//     this.plot = plot;
//     this.tipo = tipo;
//     this.anio = anio;
//     this.genero = genero;
//     this.director = director;
//     this.actores = actores;
//     this.poster = poster;
//     this.rating = rating;
// }

// function traerPeliculas(palabraBusqueda) {
//     fetch(
//         `https://www.omdbapi.com/?apikey=${API_KEY}&t=${palabraBusqueda}`
//     ).then(function(response) {
//         return response.json();
//     }).then(function(responseJson) {
//         if (responseJson.Response != 'False') {
//             console.log('Funciona el fetch');

//             peliculaActual = new Pelicula(responseJson.Title, responseJson.Plot, responseJson.Type, responseJson.Year, responseJson.Genre, responseJson.Director, responseJson.Actors, responseJson.Poster, responseJson.Ratings);

//             mostrarPelicula(peliculaActual);

//             return responseJson;
//         } else {
//             console.log('No funciona el fetch');
//         }
//     }).catch(function(err) {
//         console.log("Hubo un fallo en la interacción con la API.", err);
//     });

// }

// // Escuchador en el input que busca la película ejecutando el fetch
// if (inputBusqueda != null) {
//     inputBusqueda.addEventListener("input", function() {
//         traerPeliculas(inputBusqueda.value);
//     });
// }





// // Función que carga el HTML de las películas
// function cargarPelicula() {
//     let htmlPelicula = d.createElement('div');
//     htmlPelicula.className = ('div-det-pelicula');
//     htmlPelicula.innerHTML = (`<section class="container-detalle-pelicula container animate__animated animate__fadeIn" id="containerDetallePelicula">
//                             <article class="detalle-pelicula">
//                             <img id="detPoster" src="" alt="Portada de la película">
//                             <div class="deta-info">
//                             <h2 id="detTitulo"></h2>
//                             <span id="detTipo"></span>
//                             <p id="detPlot"></p>
//                             <p id="detGeneroAnio"></p>
//                             <p id="detDirector">Director:</p>
//                             <p id="detActores">Actores:</p>
//                             <span id="detRating">Rating de</span>
//                             <a href="#" id="addWL">Agregar a WatchList</a>
//                             <div>
//                             </article>
//                         </section>`);
//     this.getHtmlPelicula = () => {
//         return htmlPelicula;
//     }
// }
// cargarPelicula();

// function cargarWatchList() {
//     let htmlWatchlist = d.createElement('div');
//     htmlWatchlist.className = ('div-det-watchlist');
//     htmlWatchlist.innerHTML = (`<section class="container-watchlist container animate__animated animate__fadeIn" id="containerWatchlist">
//                             <ul class="watchlist" id="watchlist">
//                             </ul>
//                         </section>`);

//     let htmlWLItem = d.createElement('li');
//     let divItem = d.createElement('div');
//     let titulo = d.createElement('h2');
//     let plot = d.createElement('p');
//     let tipo = d.createElement('span');
//     let generoAnio = d.createElement('p');
//     let director = d.createElement('p');
//     let actores = d.createElement('p');
//     let poster = d.createElement('img');
//     let rating = d.createElement('span');
//     let botonAdd = d.createElement('a');
//     let liVacio = d.createElement('li');
//     let irInicio = d.createElement('a');

//     this.getDivItem = () => {
//         return divItem;
//     }
//     this.getTituloItem = () => {
//         return titulo;
//     }
//     this.getPlotItem = () => {
//         return plot;
//     }
//     this.getTipoItem = () => {
//         return tipo;
//     }
//     this.getGeneroAnioItem = () => {
//         return generoAnio;
//     }
//     this.getDirectorItem = () => {
//         return director;
//     }
//     this.getActoresItem = () => {
//         return actores;
//     }
//     this.getPosterItem = () => {
//         return poster;
//     }
//     this.getRating = () => {
//         return rating;
//     }
//     this.getBotonAdd = () => {
//         return botonAdd;
//     }
//     this.getLiVacio = () => {
//         return liVacio;
//     }
//     this.getIrInicio = () => {
//         return irInicio;
//     }


//     this.gethtmlWLItem = () => {
//         return htmlWLItem;
//     }
//     this.getHtmlWatchList = () => {
//         return htmlWatchlist;
//     }
// }
// // Función que muestra la película en el HTML
// function mostrarPelicula(data) {
//     mainBuscador.appendChild(getHtmlPelicula());
//     let titulo = d.getElementById('detTitulo');
//     let plot = d.getElementById('detPlot');
//     let tipo = d.getElementById('detTipo');
//     let generoAnio = d.getElementById('detGeneroAnio');
//     let director = d.getElementById('detDirector');
//     let actores = d.getElementById('detActores');
//     let poster = d.getElementById('detPoster');
//     let rating = d.getElementById('detRating');
//     titulo.innerHTML = (data.titulo);
//     plot.innerHTML = (data.plot);
//     tipo.innerHTML = (data.tipo);
//     generoAnio.innerHTML = (`${data.genero} - ${data.anio}`);
//     director.innerHTML = (`Director: ${data.director}`);
//     actores.innerHTML = (`Cast: ${data.actores}`);
//     poster.src = (data.poster);
//     rating.innerHTML = (`Rating de ${data.rating[0].Source}: ${data.rating[0].Value}`);

//     let addWL = d.getElementById('addWL');

//     let flag1 = 0;

//     for (let pelicula of watchList) {
//         if (pelicula.titulo == peliculaActual.titulo) { // Verifica si la pelicula está en la watchlist. Si no está, aumenta el contador.
//             flag1 = 1;
//         }
//     }

//     if (flag1 == 0) { // Si el contador es 0, significa que la película no está en la watchlist, por lo tanto la agrega.
//         addWL.innerHTML = ('Agregar a WatchList');
//     } else {
//         addWL.innerHTML = ('Quitar de WatchList');
//     }
//     addWL.addEventListener("click", (e) => {
//         e.preventDefault();
//         e.stopImmediatePropagation();

//         let cont = 0;
//         let flag = 0;

//         for (let peli of watchList) {

//             if (peli.titulo === peliculaActual.titulo && flag === 0) {
//                 flag = 1;
//                 e.target.innerHTML = ('Agregar a WatchList');
//                 console.log(peli.titulo);
//                 console.log(peliculaActual.titulo);
//                 let indice = watchList.indexOf(peli);
//                 removeFromWatchList(indice);
//             }
//         }

//         if (flag == 0) {
//             e.target.innerHTML = ('Quitar de WatchList');
//             addToWatchList();
//         }

//     });
// }

// function mostrarWatchList() {
//     let botonesAdd = [];
//     let peliculasListadas = [];
//     this.getPeliculasListadas = () => {
//         return peliculasListadas;
//     }
//     this.getBotonesAdd = () => {
//         return botonesAdd;
//     }
//     if (watchList.length != 0) {
//         for (let pelicula of watchList) {
//             cargarWatchList();
//             mainWatchlist.appendChild(getHtmlWatchList());
//             let ulWatchlist = d.getElementById('watchlist');

//             getTituloItem().innerHTML = (pelicula.titulo);
//             getPlotItem().id = ('WL plot');
//             getPlotItem().innerHTML = (pelicula.plot);
//             getTipoItem().className = ('WL tipo');
//             getTipoItem().innerHTML = (pelicula.tipo);
//             getGeneroAnioItem().className = ('WL generoAnio');
//             getGeneroAnioItem().innerHTML = (`${pelicula.genero} - ${pelicula.anio}`);
//             getDirectorItem().className = ('WL director');
//             getDirectorItem().innerHTML = (`Director: ${pelicula.director}`);
//             getActoresItem().className = ('WL actores');
//             getActoresItem().innerHTML = (`Cast: ${pelicula.actores}`);
//             getPosterItem().className = ('WL poster');
//             getPosterItem().alt = ('Portada de la película.');
//             getPosterItem().src = (pelicula.poster);
//             getRating().className = ('WL rating');
//             getRating().innerHTML = (`Rating de ${pelicula.rating[0].Source}: ${pelicula.rating[0].Value}`);
//             getBotonAdd().className = ('WL botonadd');
//             getBotonAdd().innerHTML = ('- Eliminar');
//             getBotonAdd().href = ('#');


//             ulWatchlist.appendChild(gethtmlWLItem());
//             gethtmlWLItem().appendChild(getPosterItem());
//             gethtmlWLItem().appendChild(getDivItem());
//             getDivItem().appendChild(getTituloItem());
//             getDivItem().appendChild(getPlotItem());
//             getDivItem().appendChild(getTipoItem());
//             getDivItem().appendChild(getGeneroAnioItem());
//             getDivItem().appendChild(getDirectorItem());
//             getDivItem().appendChild(getActoresItem());
//             getDivItem().appendChild(getRating());
//             gethtmlWLItem().appendChild(getBotonAdd());

//             peliculasListadas.push(gethtmlWLItem());
//             botonesAdd.push(getBotonAdd());

//             getBotonAdd().addEventListener("click", (e) => {
//                 e.preventDefault();
//                 e.stopImmediatePropagation();
//                 let indice;
//                 let peliculisima;
//                 for (let peli of watchList) {
//                     if (botonesAdd.indexOf(e.target) == watchList.indexOf(peli)) {
//                         indice = botonesAdd.indexOf(e.target);
//                         peliculisima = watchList.indexOf(peli);
//                         peliculasListadas[indice].remove();
//                         peliculasListadas.splice(indice, 1);
//                         botonesAdd.splice(indice, 1);
//                     }
//                 }
//                 removeFromWatchList(indice);
//                 if (watchList.length == 0) {
//                     getLiVacio().innerHTML = ('Todavía no agregaste contenido a tu Watchlist');
//                     getLiVacio().className = ('WL-vacia');
//                     getIrInicio().href = ('index.html');
//                     getIrInicio().innerHTML = ('Buscar contenido');
//                     getIrInicio().className = ('btn-ir-inicio');
//                     mainWatchlist.appendChild(getHtmlWatchList());
//                     let ulWatchlist = d.getElementById('watchlist');
//                     ulWatchlist.appendChild(getLiVacio());
//                     getLiVacio().appendChild(getIrInicio());
//                 }
//             });

//         }
//     } else {
//         cargarWatchList();
//         getLiVacio().innerHTML = ('Todavía no agregaste contenido a tu Watchlist');
//         getLiVacio().className = ('WL-vacia');
//         getIrInicio().href = ('index.html');
//         getIrInicio().innerHTML = ('Buscar contenido');
//         getIrInicio().className = ('btn-ir-inicio');
//         mainWatchlist.appendChild(getHtmlWatchList());
//         let ulWatchlist = d.getElementById('watchlist');
//         ulWatchlist.appendChild(getLiVacio());
//         getLiVacio().appendChild(getIrInicio());
//     }
// }
// if (mainWatchlist) {
//     mostrarWatchList();
// }

// // Función para agregar películas a la watchlist
// function addToWatchList() { // Entra si la pelicula existe en la watchlist
//     watchList.push(peliculaActual);
//     console.log(watchList);
//     localStorage.setItem('watchList', JSON.stringify(watchList));
// }


// // Función para quitar películas de la watchlist
// function removeFromWatchList(indice) { // Entra si la pelicula NO existe en la watchlist
//     watchList.splice(indice, 1);
//     console.log(watchList);
//     localStorage.setItem('watchList', JSON.stringify(watchList));
// }