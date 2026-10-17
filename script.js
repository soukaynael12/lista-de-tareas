let formulario = document.querySelector("#formulario");
let input = document.querySelector("#input-tarea");
let lista = document.querySelector("#lista");

// 1. Función para guardar las tareas en el navegador
function guardarTareas() {
  let tareas = [];
  // Buscamos todos los textos de las tareas
  document.querySelectorAll("li span").forEach(function(span) {
    tareas.push(span.textContent);
  });
  // Las guardamos convertidas en texto
  localStorage.setItem("misTareas", JSON.stringify(tareas));
}

// 2. Función para crear una tarea en la pantalla
function crearTareaEnPantalla(textoDeTarea) {
  let nuevaTarea = document.createElement("li");
  
  let texto = document.createElement("span");
  texto.textContent = textoDeTarea;
  
  let botonBorrar = document.createElement("button");
  botonBorrar.textContent = "X";
  botonBorrar.classList.add("boton-borrar");

  // Cuando se hace clic en la X
  botonBorrar.addEventListener("click", function() {
    nuevaTarea.remove();
    guardarTareas(); // Volvemos a guardar para actualizar la lista
  });

  nuevaTarea.appendChild(texto);
  nuevaTarea.appendChild(botonBorrar);
  lista.appendChild(nuevaTarea);
}

// 3. Función para cargar las tareas cuando abrimos la página
function cargarTareas() {
  let tareasGuardadas = JSON.parse(localStorage.getItem("misTareas"));
  
  if (tareasGuardadas) {
    tareasGuardadas.forEach(function(tareaTexto) {
      crearTareaEnPantalla(tareaTexto);
    });
  }
}

// 4. Evento al pulsar el botón "Añadir"
formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  if (input.value === "") return;

  crearTareaEnPantalla(input.value);
  guardarTareas(); // Guardamos la nueva tarea
  input.value = "";
});

// 5. Al arrancar la página, cargamos las tareas que había guardadas
cargarTareas();