class Cancion {
  constructor(codigo, nombre, artista) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.artista = artista;
  }
}

class ListaCanciones {
  constructor(herramientasInterfazGrafica) {
    this.catalogoDisponible = [
      new Cancion(1, "Corporate Harmonics", "C.H."),
      new Cancion(2, "Corporate Timeline", "C.T."),
      new Cancion(3, "Make It Loud", "M.I.L."),
      new Cancion(4, "Modern Interior", "M.I."),
      new Cancion(5, "Pop Rock Music Kit", "P.R.M.K"),
    ];
    this.listaFiltrada = this.catalogoDisponible;
    this.herramientasInterfazGrafica = herramientasInterfazGrafica;
    this.cargar();
  }
  cargar() {
    this.herramientasInterfazGrafica.cargarListaCanciones(this.listaFiltrada);
  }
}

class ListaFavoritos {
  constructor(herramientasInterfazGrafica) {
    this.listaCanciones = new Array();
    this.herramientasInterfazGrafica = herramientasInterfazGrafica;
  }
  agregarCancion(cancion) {
    if (this.listaCanciones.indexOf(cancion) == -1) {
      this.herramientasInterfazGrafica.agregarEnListaDeFavoritos(cancion);

      this.listaCanciones.push(cancion);
    }
  }
  removerCancion(cancion) {
    if (this.listaCanciones.indexOf(cancion) != -1) {
      this.herramientasInterfazGrafica.removerDeListaDeFavoritos(cancion);

      let indice = this.listaCanciones.indexOf(cancion);
      if (indice != -1)
        this.listaCanciones.splice(indice, 1);
    }
  }

}

class ListaReproduccion {
  constructor(herramientasInterfazGrafica) {
    this.listaCanciones = new Array();
    this.herramientasInterfazGrafica = herramientasInterfazGrafica;
  }
  agregarCancion(cancion) {
    if (this.listaCanciones.indexOf(cancion) == -1) {
      this.herramientasInterfazGrafica.agregarEnListaDeReproduccion(cancion);

      this.listaCanciones.push(cancion);
    }
  }
  removerCancion(cancion) {
    if (this.listaCanciones.indexOf(cancion) != -1) {
      this.herramientasInterfazGrafica.removerDeListaDeReproduccion(cancion);

      let indice = this.listaCanciones.indexOf(cancion);
      if (indice != -1)
        this.listaCanciones.splice(indice, 1);
    }
  }
  reproducir(cancion) {
    this.herramientasInterfazGrafica.reproducir(cancion);
    this.listaCanciones = [cancion];
    reproductor.empezarReproduccion();
  }
  reproducirLista(lista) {
    this.herramientasInterfazGrafica.reproducirLista(lista);
    this.listaCanciones = new Array();
    lista.forEach(cancion => {
      this.listaCanciones.push(cancion);
    });
    reproductor.empezarReproduccion();
  }
}

class HerramientasInterfazGrafica {
  constructor(reproductor) {
    this.domListaCanciones = document.getElementById("listaCanciones");
    this.domListaFavoritos = document.getElementById("listaFavoritos");
    this.domListaInformacion = document.getElementById("listaInformacion");
    this.domListaReproduccion = document.getElementById("listaReproduccion");
    this.domBotonReproducirListaCanciones = document.getElementById("botonReproducirListaCanciones");
    this.domBotonReproducirListaCanciones.addEventListener('click', function () {
      reproductor.listaReproduccion.reproducirLista(reproductor.listaCanciones.listaFiltrada);
    });

    this.domBotonReproducirListaFavoritos = document.getElementById("botonReproducirListaFavoritos");
    this.domBotonReproducirListaFavoritos.addEventListener('click', function () {
      reproductor.listaReproduccion.reproducirLista(reproductor.listaFavoritos.listaCanciones);
    });

    this.reproductor = reproductor;
  }
  cargarListaCanciones(listaFiltrada) {
    this.limpiarListaDeCanciones();
    listaFiltrada.forEach((cancion) => {
      this.agregarEnListaDeCanciones(cancion);
    });
  }
  limpiarListaDeCanciones() {
    while (this.domListaCanciones.firstChild) {
      this.domListaCanciones.removeChild(this.domListaCanciones.firstChild);
    }
  }
  agregarEnListaDeCanciones(cancion) {
    let elementoCancion = this.crearElementoListaDeCanciones(cancion);
    this.domListaCanciones.appendChild(elementoCancion);
  }
  crearElementoListaDeCanciones(cancion) {
    let botonReproducir = document.createElement("i");
    botonReproducir.className = "bi bi-play-circle";
    botonReproducir.addEventListener('click', function () {
      reproductor.listaReproduccion.reproducir(cancion);
    });

    let botonFavorito = document.createElement("i");
    botonFavorito.className = "bi bi-heart-fill";
    botonFavorito.addEventListener('click', function () {
      reproductor.listaFavoritos.agregarCancion(cancion);
    });

    let botonAgregar = document.createElement("i");
    botonAgregar.className = "bi bi-plus-circle"
    botonAgregar.addEventListener('click', function () {
      reproductor.listaReproduccion.agregarCancion(cancion);
    });

    let spanNombreCancion = document.createElement("span");
    spanNombreCancion.innerText = cancion.nombre;

    let elementoCancion = document.createElement("div");
    elementoCancion.appendChild(spanNombreCancion);
    elementoCancion.appendChild(botonReproducir);
    elementoCancion.appendChild(botonFavorito);
    elementoCancion.appendChild(botonAgregar);
    return elementoCancion;
  }
  agregarEnListaDeFavoritos(cancion) {
    let elementoCancion = this.crearElementoListaDeFavoritos(cancion);
    this.domListaFavoritos.appendChild(elementoCancion);
  }
  removerDeListaDeFavoritos(cancion) {
    let elementoCancion = document.getElementById("elementoFavorito_" + cancion.codigo);
    if (elementoCancion) {
      while (elementoCancion.firstChild) {
        elementoCancion.removeChild(elementoCancion.firstChild);
      }
      elementoCancion.parentElement.removeChild(elementoCancion);
    }
  }
  crearElementoListaDeFavoritos(cancion) {
    let botonFavorito = document.createElement("i");
    botonFavorito.className = "bi bi-heart";
    botonFavorito.addEventListener('click', function () {
      reproductor.listaFavoritos.removerCancion(cancion);
    });

    let botonReproducir = document.createElement("i");
    botonReproducir.className = "bi bi-play-circle";
    botonReproducir.addEventListener('click', function () {
      reproductor.listaReproduccion.reproducir(cancion);
    });

    let botonAgregar = document.createElement("i");
    botonAgregar.className = "bi bi-plus-circle"
    botonAgregar.addEventListener('click', function () {
      reproductor.listaReproduccion.agregarCancion(cancion);
    });

    let spanNombreCancion = document.createElement("span");
    spanNombreCancion.innerText = cancion.nombre;

    let elementoCancion = document.createElement("div");
    elementoCancion.id = "elementoFavorito_" + cancion.codigo;
    elementoCancion.appendChild(spanNombreCancion);
    elementoCancion.appendChild(botonReproducir);
    elementoCancion.appendChild(botonFavorito);
    elementoCancion.appendChild(botonAgregar);
    return elementoCancion;
  }
  agregarEnListaDeReproduccion(cancion) {
    let elementoCancion = this.crearElementoListaDeReproduccion(cancion);
    this.domListaReproduccion.appendChild(elementoCancion);
  }
  limpiarListaDeReproduccion() {
    while (this.domListaReproduccion.firstChild) {
      this.domListaReproduccion.removeChild(this.domListaReproduccion.firstChild);
    }
  }
  removerDeListaDeReproduccion(cancion) {
    let elementoCancion = document.getElementById("elementoReproduccion_" + cancion.codigo);
    if (elementoCancion) {
      while (elementoCancion.firstChild) {
        elementoCancion.removeChild(elementoCancion.firstChild);
      }
      elementoCancion.parentElement.removeChild(elementoCancion);
    }
    reproductor.empezarReproduccion();
  }
  reproducir(cancion) {
    this.limpiarListaDeReproduccion();
    this.agregarEnListaDeReproduccion(cancion);
  }
  reproducirLista(lista) {
    this.limpiarListaDeReproduccion();
    lista.forEach(cancion => {
      this.agregarEnListaDeReproduccion(cancion);
    });
  }
  crearElementoListaDeReproduccion(cancion) {
    let botonReproducir = document.createElement("i");
    botonReproducir.className = "bi bi-play-circle";
    botonReproducir.addEventListener('click', function () {
      reproductor.reproducir(cancion);
    });

    let botonFavorito = document.createElement("i");
    botonFavorito.className = "bi bi-heart-fill";
    botonFavorito.addEventListener('click', function () {
      reproductor.listaFavoritos.agregarCancion(cancion);
    });


    let botonRemover = document.createElement("i");
    botonRemover.className = "bi bi-dash-circle"
    botonRemover.addEventListener('click', function () {
      reproductor.listaReproduccion.removerCancion(cancion);
    });


    let spanNombreCancion = document.createElement("span");
    spanNombreCancion.innerText = cancion.nombre;

    let elementoCancion = document.createElement("div");
    elementoCancion.id = "elementoReproduccion_" + cancion.codigo;
    elementoCancion.appendChild(spanNombreCancion);
    elementoCancion.appendChild(botonReproducir);
    elementoCancion.appendChild(botonFavorito);
    elementoCancion.appendChild(botonRemover);
    return elementoCancion;
  }
  crearListaInformacion(cancion) {
    this.limpiarListaInformacion();

    let elementoNombreCancion = document.getElementById("nombreCancionListaInformacion");
    elementoNombreCancion.innerText = "Nombre: " + cancion.nombre;

    let elementoNombreArtista = document.getElementById("nombreArtistaListaInformacion");
    elementoNombreArtista.innerText = "Artista: " + cancion.artista;

    let elementoImagenCancion = document.getElementById("imagenListaInformacion");
    elementoImagenCancion.src = './images/' + cancion.nombre + '.jpeg';
  }
  limpiarListaInformacion() {
    let elementoNombreCancion = document.getElementById("nombreCancionListaInformacion");
    elementoNombreCancion.innerText = "Nombre: ";

    let elementoNombreArtista = document.getElementById("nombreArtistaListaInformacion");
    elementoNombreArtista.innerText = "Artista: ";

    let elementoImagenCancion = document.getElementById("imagenListaInformacion");
    elementoImagenCancion.src = "./images/Default.jpeg";
}

}

class Reproductor {
  constructor() {
    this.indiceCancionPorReproducir = 0;
    this.herramientas = new HerramientasInterfazGrafica(this);
    this.listaCanciones = new ListaCanciones(this.herramientas);
    this.listaFavoritos = new ListaFavoritos(this.herramientas);
    this.listaReproduccion = new ListaReproduccion(this.herramientas);
    this.reproductorDeAudio = new Audio();
  }
  empezarReproduccion() {
    this.indiceCancionPorReproducir = 0;
    setInterval(reproductor.reproducir, 3000)
  }
  reproducir() 
  {
    if (reproductor.listaReproduccion.listaCanciones.length > 0) {
      let cancion = reproductor.listaReproduccion.listaCanciones[reproductor.indiceCancionPorReproducir];
      reproductor.herramientas.crearListaInformacion(cancion);
      reproductor.reproductorDeAudio.src = "./mp3/"+cancion.nombre+".mp3";
      reproductor.reproductorDeAudio.autoplay = true;
      reproductor.indiceCancionPorReproducir = (reproductor.indiceCancionPorReproducir + 1) % reproductor.listaReproduccion.listaCanciones.length;
      }
  }
}

const reproductor = new Reproductor();