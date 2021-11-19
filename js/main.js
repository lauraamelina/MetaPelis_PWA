// API KEY
let API_KEY = 'df926bdd';

let inputElement = document.getElementById('busqueda');
let divInfo = document.getElementById('mainInfo');
let sendButton = document.getElementById('sendButton');
let mainParaVer = document.getElementById('mainParaVer');
let divRecomendacion = document.getElementById('recomendacion');
let paraVer = [];
let laPelicula;


// CONEXION A INTERNET
window.addEventListener('offline', event => {
    let conexion = document.getElementById('verificarConexion');
    conexion.className = "offline";
    conexion.innerHTML = 'Offline';
    document.querySelector(".formulario").remove();
    document.getElementById("mainInfo").innerHTML = `
    <div> 
    <video src="img/video.MOV" controls </video>
    <div> 
    `;
    document.getElementById("info").style.width = '100vw';

});

window.addEventListener('online', event => {
    let conexion = document.getElementById('verificarConexion');
    conexion.className = "linea";
    conexion.innerHTML = 'En línea';

});

if (!navigator.onLine) {
    let conexion = document.getElementById('verificarConexion');
    conexion.className = "offline";
    conexion.innerHTML = 'Offline';
    document.querySelector(".formulario").remove();
    document.getElementById("mainInfo").innerHTML = `
    <div> 
    <video src="img/video.MOV" controls </video>
    <div> 
    `;
    document.getElementById("info").style.width = '100vw';
}

if (localStorage.getItem("paraVer")) {
    let listaLocalStorage = JSON.parse(localStorage.getItem("paraVer"));
    listaLocalStorage.forEach(function(e) {
        let peli = new Pelicula(e.titulo, e.sinopsis, e.anio, e.genero, e.director, e.actores, e.rating, e.poster);
        paraVer.push(peli);
    })
}


// ESCUCHA INPUT PELICULA

if (document.getElementById("sendButton")) {
    sendButton.addEventListener("click", () => {
        buscarEnApi(inputElement.value);
    });
}



//FUNCIÓN PELICULA
function Pelicula(titulo, sinopsis, anio, genero, director, actores, rating, poster) {
    this.titulo = titulo;
    this.sinopsis = sinopsis;
    this.anio = anio;
    this.genero = genero;
    this.director = director;
    this.actores = actores;
    this.rating = rating;
    this.poster = poster;
}


// FUNCION QUE HACE EL FETCH QUE TRAE LAS PELICULAS
function buscarEnApi(pelicula) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${pelicula}`)
        .then(response => response.json())
        .then(data => {
            laPelicula = new Pelicula(data.Title, data.Plot, data.Year, data.Genre, data.Director, data.Actors, data.Ratings, data.Poster);
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
    let searchPeli = document.createElement("div");
    let titulo = document.createElement("h2");
    let sinopsis = document.createElement("p");
    let anio = document.createElement("p");
    let genero = document.createElement("p");
    let director = document.createElement("p");
    let actores = document.createElement("p");
    let rating = document.createElement("p");
    let poster = document.createElement("img");
    let btnLista = document.createElement("a");

    searchPeli.appendChild(poster);

    searchPeli.appendChild(titulo);
    searchPeli.appendChild(sinopsis);
    searchPeli.appendChild(anio);
    searchPeli.appendChild(genero);
    searchPeli.appendChild(director);
    searchPeli.appendChild(actores);
    searchPeli.appendChild(rating);
    searchPeli.appendChild(btnLista);

    searchPeli.id = "info";

    divInfo.appendChild(searchPeli);

    titulo.innerHTML = laPelicula.titulo;
    sinopsis.innerHTML = `<span class="fw-bold">  Sinopsis: </span>${laPelicula.sinopsis} `;
    anio.innerHTML = `<span class="fw-bold"> Año: </span>${laPelicula.anio} `;
    genero.innerHTML = `<span class="fw-bold"> Género: </span>${laPelicula.genero} `;
    director.innerHTML = `<span class="fw-bold"> Director: </span>${laPelicula.director} `;
    actores.innerHTML = `<span class="fw-bold"> Actores: </span>${laPelicula.actores} `;
    rating.innerHTML = `<span class="fw-bold"> Rating: </span>${laPelicula.rating[0].Value} `;
    if (laPelicula.poster === "N/A") {
        searchPeli.removeChild(poster);
    } else {
        poster.src = laPelicula.poster;
    }


    btnLista.innerHTML = 'Agregar a la lista';
    btnLista.href = '#';
    btnLista.className = 'btn mb-4';
    btnLista.id = 'lista';



    let banderita1 = 0;

    for (let pelicula of paraVer) {
        if (pelicula.titulo == laPelicula.titulo) {
            banderita1 = 1;
        }
    }

    if (banderita1 == 0) {
        btnLista.innerHTML = 'Agregar a la lista';


    } else {
        btnLista.innerHTML = 'Eliminar de la lista';


    }


    btnLista.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('pelicula a agregar es: ' + laPelicula.titulo);

        let banderita2 = 0;

        for (let pelicula of paraVer) {
            if (pelicula.titulo == laPelicula.titulo && banderita2 === 0) {
                banderita2 = 1;

                e.target.innerHTML = ('Agregar a la lista');
                let indice = paraVer.indexOf(pelicula);
                eliminarDeLaLista(indice);
            } else {

            }
        }

        if (banderita2 == 0) {
            e.target.innerHTML = 'Eliminar de la lista';
            agregarALaLista();
        }
    })

}

//FUNCION QUE AGREGA A LA LISTA PARA VER
function agregarALaLista() {
    paraVer.push(laPelicula);
    console.log(paraVer);
    localStorage.setItem('paraVer', JSON.stringify(paraVer));
}

//FUNCION QUE ELIMINA DE LA LISTA PARA VER
function eliminarDeLaLista(indice) {
    paraVer.splice(indice, 1);
    console.log(paraVer);
    localStorage.setItem('paraVer', JSON.stringify(paraVer));
}


// LISTA PARA VER
function listaParaVer() {
    if (paraVer.length == 0) {
        mainParaVer.innerHTML = `<h2> Todavía no agregaste películas para ver más tarde </h2>
        <a class="btn" href="index.html"> Agregar peliculas </a>
        `;
    } else {
        for (let pelicula of paraVer) {
            let divPeli = document.createElement("div");
            let titulo = document.createElement("h2");
            let sinopsis = document.createElement("p");
            let anio = document.createElement("p");
            let genero = document.createElement("p");
            let director = document.createElement("p");
            let actores = document.createElement("p");
            let rating = document.createElement("p");
            let poster = document.createElement("img");
            let btnLista = document.createElement("a");

            divPeli.appendChild(poster);
            divPeli.appendChild(poster);
            divPeli.appendChild(titulo);
            divPeli.appendChild(sinopsis);
            divPeli.appendChild(anio);
            divPeli.appendChild(genero);
            divPeli.appendChild(director);
            divPeli.appendChild(actores);
            divPeli.appendChild(rating);
            divPeli.appendChild(btnLista);
            mainParaVer.appendChild(divPeli);

            titulo.innerHTML = pelicula.titulo;
            sinopsis.innerHTML = `<span class="fw-bold">  Sinopsis: </span>${pelicula.sinopsis} `;
            anio.innerHTML = `<span class="fw-bold"> Año: </span>${pelicula.anio} `;
            genero.innerHTML = `<span class="fw-bold"> Género: </span>${pelicula.genero} `;
            director.innerHTML = `<span class="fw-bold"> Director: </span>${pelicula.director} `;
            actores.innerHTML = `<span class="fw-bold"> Actores: </span>${pelicula.actores} `;
            rating.innerHTML = `<span class="fw-bold"> Rating: </span>${pelicula.rating[0].Value} `;


            if (pelicula.poster === "N/A") {
                divPeli.removeChild(poster);
            } else {
                poster.src = pelicula.poster;
            }


            divPeli.id = pelicula.titulo;
            divPeli.className = 'divPelicula';
            btnLista.innerHTML = 'Eliminar';
            btnLista.href = '#';
            btnLista.className = 'btn mt-2';
            btnLista.id = 'eliminarLista';

            btnLista.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                let indice = paraVer.indexOf(pelicula);
                eliminarDeLaLista(indice);
                divParaEliminar = document.getElementById(pelicula.titulo);
                divParaEliminar.remove();

            })
        }
    }
}

if (document.getElementById("mainParaVer")) {
    listaParaVer();
}

//  RECOMENDACIONES
function recomendacion() {
    let laRecomendacion = paraVer[Math.floor(Math.random() * paraVer.length)];
    if (laRecomendacion == undefined) {
        divRecomendacion.innerHTML = `<h3> Todavía no agregaste películas para ver más tarde </h3>
        <a class="btn" href="index.html"> Agregar peliculas </a>`;


    } else {
        console.log('Recomendación: ' + laRecomendacion);
        let divPeli = document.createElement("div");
        let titulo = document.createElement("h2");
        let sinopsis = document.createElement("p");
        let anio = document.createElement("p");
        let genero = document.createElement("p");
        let director = document.createElement("p");
        let actores = document.createElement("p");
        let rating = document.createElement("p");
        let poster = document.createElement("img");


        divPeli.appendChild(poster);
        divPeli.appendChild(poster);
        divPeli.appendChild(titulo);
        divPeli.appendChild(sinopsis);
        divPeli.appendChild(anio);
        divPeli.appendChild(genero);
        divPeli.appendChild(director);
        divPeli.appendChild(actores);
        divPeli.appendChild(rating);

        divRecomendacion.appendChild(divPeli);

        titulo.innerHTML = laRecomendacion.titulo;
        sinopsis.innerHTML = `<span class="fw-bold">  Sinopsis: </span>${laRecomendacion.sinopsis} `;
        anio.innerHTML = `<span class="fw-bold"> Año: </span>${laRecomendacion.anio} `;
        genero.innerHTML = `<span class="fw-bold"> Género: </span>${laRecomendacion.genero} `;
        director.innerHTML = `<span class="fw-bold"> Director: </span>${laRecomendacion.director} `;
        actores.innerHTML = `<span class="fw-bold"> Actores: </span>${laRecomendacion.actores} `;
        rating.innerHTML = `<span class="fw-bold"> Rating: </span>${laRecomendacion.rating[0].Value} `;


        if (laRecomendacion.poster === "N/A") {
            divPeli.removeChild(poster);
        } else {
            poster.src = laRecomendacion.poster;
        }


        divPeli.id = laRecomendacion.titulo;
        divPeli.className = 'divPelicula mt-5';

    }
}

if (document.getElementById("recomendacion")) {
    recomendacion();
}