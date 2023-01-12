"use strict";

/* Variables */
const listaCursos = document.getElementById("lista-cursos");
/* Carrito de Compras */
const carrito = document.getElementById("carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciaCarrito = document.getElementById("vaciar-carrito");

let articulosCarrito = [];

registrarEventos();
function registrarEventos() {
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciaCarrito.addEventListener("click", eliminaCarrito);
}

function agregarCurso(e) {
  e.preventDefault(); /*No recargar la pagina por cada click */
  const btnAgregar = e.target.classList.contains("agregar-carrito");
  if (btnAgregar) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerContenido(cursoSeleccionado);
  }
}
/* Lee el contenido al cual dimos click y extra su informacion*/
function leerContenido(curso) {
  // console.log(curso);

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  /* Si el producto ya existe */
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    /* Actualizamos la cantidad */
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        // curso.precio = `$${curso.precio * curso.cantidad}`;
        return curso;
      } else {
        return curso;
      }
    });
  } else {
    /* Agrega un nuevo curso */
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  /* Agregar elementos al carrito */
  console.log(articulosCarrito);

  carritoHTML();
}

/* Muestra las compras en el html */
function carritoHTML() {
  vaciarElCarrito();

  articulosCarrito.forEach((curso) => {
    /* Destructuring */
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"/></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function vaciarElCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function eliminarCurso(e) {
  const eliminar = e.target.classList.contains("borrar-curso");
  if (eliminar) {
    const cursoId = e.target.getAttribute("data-id");

    /* Elimina */
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
  }
}

function eliminaCarrito() {
  // console.log("eliminando");
  articulosCarrito = []; /* Elimina el arreglo a 0 */

  vaciarElCarrito(); /* Esta funcion elimina todo */
}
