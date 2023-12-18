// variables
const carrito = document.querySelector("#carrito");
const containerCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCurso = document.querySelector("#lista-cursos");
let articulosCarrito = [];

loadingEventlistener();
function loadingEventlistener() {
  // cuando agregas un curso presionando "Añadir Al Carrito"
  listaCurso.addEventListener("click", agregarCurso);


  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos el arreglo

    limpiarHTML();  //eliminamos todo el HTML
  })
}

//funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoID = e.target.getAttribute("data-id");

    //Elimina del arreglo del articulosCarritos por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoID);

    carritoHTML(); //Iterar sobre el carrito y mostrar su html
  }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //   console.log(curso);

  //crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantida: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualiar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantida++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

//Muestra el carrtio de compras en el HTML
function carritoHTML() {
  //limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el html
  articulosCarrito.forEach((articulo) => {
    // console.log(articulo);
    const { imagen, titulo, precio, cantida, id } = articulo;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantida}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

    //Agrega el HTML del carrito en el tbody
    containerCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody
function limpiarHTML() {
  while (containerCarrito.firstChild) {
    containerCarrito.removeChild(containerCarrito.firstChild);
  }
}
