class Cancion {
  constructor(codigo, nombre, artista, genero, anio, duracion) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.artista = artista;
    this.genero = genero;
    this.anio = anio;
    this.duracion = duracion;
  }
}

class ListaCanciones {
  constructor(herramientasInterfazGrafica) {
    this.catalogoDisponible = [
      new Cancion(1, "Corporate Harmonics", "Motion Array Originals: The Creators", "Instrumental", "2020", "01:49"),
      new Cancion(2, "Corporate Timeline", "Motion Array Originals: The Creators", "Instrumental", "2023", "02:28"),
      new Cancion(3, "Make It Loud", "Motion Array Originals: The Creators", "Instrumental", "2021", "02:12"),
      new Cancion(4, "Modern Interior", "Awesome Music.", "Instrumental", "2022", "01:40"),
      new Cancion(5, "Pop Rock Music Kit", "Motion Array Originals: The Creators", "Instrumental Rock", "2015", "01:27"),
    ];
    this.listaFiltrada = this.catalogoDisponible;
    this.herramientasInterfazGrafica = herramientasInterfazGrafica;
    this.herramientasInterfazGrafica.establecerEventosFiltrado();
    this.cargar();
  }
  cargar() {
    this.herramientasInterfazGrafica.cargarListaCanciones(this.listaFiltrada);
   }
  restablecerCanciones() {
    this.listaFiltrada = this.catalogoDisponible;
    this.cargar();
  }
  filtrarCanciones(textoFiltro) {
    let texto = textoFiltro.toLowerCase();
    this.listaFiltrada = this.catalogoDisponible.filter((cancion) => {
      return cancion.nombre.toLowerCase().indexOf(texto) != -1 || cancion.artista.toLowerCase().indexOf(texto) != -1 || cancion.genero.toLowerCase().indexOf(texto) != -1
    });
    this.cargar();
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
    this.herramientasInterfazGrafica.reproducirLista(this.listaCanciones);
  }
  reproducirLista(lista, cancion) {
    this.listaCanciones = new Array();
    let indiceCancionSeleccionada = lista.indexOf(cancion);
    if (indiceCancionSeleccionada != -1) {
      for (let indiceCancionActual = indiceCancionSeleccionada; indiceCancionActual < lista.length; indiceCancionActual++) {
        this.listaCanciones.push(lista[indiceCancionActual]);
      }
      for (let indiceCancionActual = 0; indiceCancionActual < indiceCancionSeleccionada; indiceCancionActual++) {
        this.listaCanciones.push(lista[indiceCancionActual]);
      }
    }
    this.herramientasInterfazGrafica.reproducirLista(this.listaCanciones);
  }
}

class HerramientasInterfazGrafica {
  constructor(reproductor) {
    this.domListaCanciones = document.getElementById("listaCanciones");
    this.domListaFavoritos = document.getElementById("listaFavoritos");
    this.domListaInformacion = document.getElementById("listaInformacion");
    this.domListaReproduccion = document.getElementById("listaReproduccion");
    this.reproductor = reproductor;
  }
  establecerEventosFiltrado() {
    this.domCatalogoBotonFiltrarCanciones = document.getElementById("catalogoBotonFiltroCanciones");
    this.domCatalogoBotonRestablecerCanciones = document.getElementById("catalogoBotonRestablecerCanciones");
    this.domCatalogoBotonFiltrarCanciones.addEventListener('click', function () {
      this.domCatalogoTextoFiltroCanciones = document.getElementById("catalogoTextoFiltroCanciones");
      reproductor.listaCanciones.filtrarCanciones(this.domCatalogoTextoFiltroCanciones.value);
    });
    this.domCatalogoBotonRestablecerCanciones.addEventListener('click', function () {
      this.domCatalogoTextoFiltroCanciones = document.getElementById("catalogoTextoFiltroCanciones");
      this.domCatalogoTextoFiltroCanciones.value = "";
      reproductor.listaCanciones.restablecerCanciones();
    });
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
      reproductor.listaReproduccion.reproducirLista(reproductor.listaCanciones.listaFiltrada, cancion);
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
      reproductor.listaReproduccion.reproducirLista(reproductor.listaFavoritos.listaCanciones, cancion);
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
    this.limpiarListaInformacion();
    reproductor.empezarReproduccion();
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

    let elementoNombreCancion = document.getElementById("listaInformacionNombreCancion");
    elementoNombreCancion.innerText = "Nombre: " + cancion.nombre;
    let elementoNombreArtista = document.getElementById("listaInformacionNombreArtista");
    elementoNombreArtista.innerText = "Artista: " + cancion.artista;
    let elementoImagenCancion = document.getElementById("listaInformacionImagen");
    elementoImagenCancion.src = './images/' + cancion.nombre + '.jpeg';
    let elementoGenero = document.getElementById("listaInformacionGenero");
    elementoGenero.innerText = "Género: " + cancion.genero;
    let elementoAnio = document.getElementById("listaInformacionNombreAnio");
    elementoAnio.innerText = "Año: " + cancion.anio;
    let elementoDuracion = document.getElementById("listaInformacionDuracion");
    elementoDuracion.innerText = "Duración: " + cancion.duracion;
  }
  limpiarListaInformacion() {
    let elementoNombreCancion = document.getElementById("listaInformacionNombreCancion");
    elementoNombreCancion.innerText = "Nombre: ";
    let elementoNombreArtista = document.getElementById("listaInformacionNombreArtista");
    elementoNombreArtista.innerText = "Artista: ";
    let elementoImagenCancion = document.getElementById("listaInformacionImagen");
    elementoImagenCancion.src = "./images/Default.jpeg";
    let elementoGenero = document.getElementById("listaInformacionGenero");
    elementoGenero.innerText = "Género: ";
    let elementoAnio = document.getElementById("listaInformacionNombreAnio");
    elementoAnio.innerText = "Año: ";
    let elementoDuracion = document.getElementById("listaInformacionDuracion");
    elementoDuracion.innerText = "Duración: ";
  }
  establecerEventosReproductor() {
    this.domReproductorBotonAnterior = document.getElementById("reproductorBotonAnterior");
    this.domReproductorBotonAnterior.addEventListener('click', function () {
      reproductor.reproducirAnterior();
    });

    this.domReproductorBotonSiguiente = document.getElementById("reproductorBotonSiguiente");
    this.domReproductorBotonSiguiente.addEventListener('click', function () {
      reproductor.reproducirSiguiente();
    });

    this.domReproductorBotonPausa = document.getElementById("reproductorBotonPausa");
    this.domReproductorBotonPausa.addEventListener('click', function () {
      reproductor.pausarReproduccion();
    });

    this.domReproductorBotonReproducir = document.getElementById("reproductorBotonReproducir");
    this.domReproductorBotonReproducir.addEventListener('click', function () {
      reproductor.continuarReproduccion();
    });

    this.domReproductorBotonSilenciar = document.getElementById("reproductorBotonSilenciar");
    this.domReproductorBotonSilenciar.addEventListener('click', function () {
      reproductor.silenciar();
    });
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
    this.reproductorDeAudio.volume = 0.2;
    this.reproductorDeAudio.addEventListener('ended', function () {
      reproductor.reproducirSiguiente();
    });
    this.herramientas.establecerEventosReproductor();
  }
  empezarReproduccion() {
    reproductor.reproductorDeAudio.pause();
    this.reproducir();
  }
  reproducir(cancion) {
    if (reproductor.listaReproduccion.listaCanciones.length > 0) {
      if (!cancion) {
        reproductor.indiceCancionPorReproducir = 0;
        cancion = reproductor.listaReproduccion.listaCanciones[this.indiceCancionPorReproducir];
      }
      else {
        reproductor.indiceCancionPorReproducir = reproductor.listaReproduccion.listaCanciones.indexOf(cancion);
      }
      if (reproductor.indiceCancionPorReproducir != -1) {
        reproductor.herramientas.crearListaInformacion(cancion);
        let rutaArchivoCancion = "./mp3/" + cancion.nombre + ".mp3";
        reproductor.reproductorDeAudio.src = rutaArchivoCancion;
        reproductor.reproductorDeAudio.autoplay = true;
      }
    }
  }
  reproducirAnterior() {
    if (reproductor.listaReproduccion.listaCanciones.length > 0) {
      if (reproductor.indiceCancionPorReproducir == 0) {
        const cancion = reproductor.listaReproduccion.listaCanciones[reproductor.listaReproduccion.listaCanciones.length - 1];
        reproductor.reproducir(cancion);
      }
      else {
        const cancion = reproductor.listaReproduccion.listaCanciones[reproductor.indiceCancionPorReproducir - 1];
        reproductor.reproducir(cancion);
      }
    }

  }
  reproducirSiguiente() {
    if (reproductor.listaReproduccion.listaCanciones.length > 0) {
      if (reproductor.indiceCancionPorReproducir == reproductor.listaReproduccion.listaCanciones.length - 1) {
        const cancion = reproductor.listaReproduccion.listaCanciones[0];
        reproductor.reproducir(cancion);
      }
      else {
        const cancion = reproductor.listaReproduccion.listaCanciones[reproductor.indiceCancionPorReproducir + 1];
        reproductor.reproducir(cancion);
      }
    }
  }
  pausarReproduccion() {
    reproductor.reproductorDeAudio.pause();
  }
  continuarReproduccion() {
    reproductor.reproductorDeAudio.play();
  }
  silenciar() {
    reproductor.reproductorDeAudio.muted = !reproductor.reproductorDeAudio.muted;
  }

}

const reproductor = new Reproductor();