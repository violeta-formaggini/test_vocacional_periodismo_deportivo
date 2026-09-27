/* =========================================================================
   TEST VOCACIONAL DE PERIODISMO — script.js
   Este archivo tiene 5 partes marcadas con comentarios grandes:
     1. PERFILES     -> los 4 resultados posibles
     2. PREGUNTAS    -> las 8 preguntas y sus opciones
     3. ESTADO       -> variables que van cambiando mientras el usuario juega
     4. LÓGICA       -> funciones que muestran preguntas y calculan el resultado
     5. EVENTOS      -> conecta los botones del HTML con las funciones
   Para modificar el test, normalmente solo necesitás tocar las partes 1 y 2.
   ========================================================================= */


/* =========================================================================
   1. PERFILES
   Cada perfil tiene una clave interna (id), un emoji, un título y una
   descripción. La clave (id) es la que se usa en las preguntas para sumar
   puntos, así que si la cambiás acá, actualizala también en las preguntas.
   ========================================================================= */
const PERFILES = {
  I: {
    emoji: "🔎",
    titulo: "Periodista detective",
    descripcion:
      "Te gusta buscar información, comparar fuentes y descubrir qué hay detrás de una noticia. La investigación periodística y la verificación de datos podrían interesarte mucho.",
  },
  E: {
    emoji: "🎙️",
    titulo: "Cronista",
    descripcion:
      "Te interesa escuchar, preguntar y conocer las historias de las personas. Podrías disfrutar especialmente las entrevistas, las crónicas y los perfiles.",
  },
  A: {
    emoji: "📹",
    titulo: "Periodista audiovisual",
    descripcion:
      "Pensás en imágenes, sonidos y voces. La radio, los podcasts, los videos y las coberturas audiovisuales pueden ser tu fuerte.",
  },
  D: {
    emoji: "📱",
    titulo: "Periodista de las redes",
    descripcion:
      "Te interesa comunicar de forma rápida, clara y creativa. Te atraen las redes, los formatos digitales y la manera en que circula la información.",
  },
};


/* =========================================================================
   2. PREGUNTAS
   Cada pregunta tiene un texto y una lista de opciones.
   Cada opción tiene el texto que ve el usuario y un "perfil" (I, E, A o D)
   que es el que suma el punto. El usuario NUNCA ve el campo "perfil".
   Para agregar una pregunta, copiá un bloque {...} completo y modificalo.
   Para agregar un perfil nuevo, primero agregalo arriba en PERFILES y
   después usá su clave acá.
   ========================================================================= */
const PREGUNTAS = [
  {
    texto: "Cuando aparece una noticia sorprendente, lo primero que harías sería:",
    opciones: [
      { texto: "Buscar de dónde salió la información y confirmar si es verdadera.", perfil: "I" },
      { texto: "Intentar hablar con las personas involucradas.", perfil: "E" },
      { texto: "Imaginar cómo mostrarla con imágenes, sonidos o videos.", perfil: "A" },
      { texto: "Pensar cómo comunicarla en Instagram, TikTok o YouTube.", perfil: "D" },
    ],
  },
  {
    texto: "¿Qué actividad te parece más interesante?",
    opciones: [
      { texto: "Investigar un problema de la ciudad y encontrar información que nadie conocía.", perfil: "I" },
      { texto: "Entrevistar a una persona con una historia interesante.", perfil: "E" },
      { texto: "Grabar y editar un podcast o un video.", perfil: "A" },
      { texto: "Crear una publicación que informe y llame la atención en redes.", perfil: "D" },
    ],
  },
  {
    texto: "Si tuvieras que cubrir un evento de la ExpoCarreras, ¿qué harías?",
    opciones: [
      { texto: "Averiguar cuántas instituciones participan, qué carreras ofrecen y comparar la información.", perfil: "I" },
      { texto: "Preguntarles a los visitantes qué están buscando y qué les interesa.", perfil: "E" },
      { texto: "Realizar una transmisión en vivo o grabar imágenes del evento.", perfil: "A" },
      { texto: "Armar historias, reels o una cobertura rápida para redes sociales.", perfil: "D" },
    ],
  },
  {
    texto: "¿Qué tipo de contenido te gusta consumir más?",
    opciones: [
      { texto: "Documentales, informes o investigaciones.", perfil: "I" },
      { texto: "Entrevistas, perfiles o historias de vida.", perfil: "E" },
      { texto: "Videos, películas, podcasts o programas de radio.", perfil: "A" },
      { texto: "Noticias breves, hilos, reels y publicaciones informativas.", perfil: "D" },
    ],
  },
  {
    texto: "¿Qué pregunta te da más curiosidad?",
    opciones: [
      { texto: "«¿Qué hay detrás de este problema?»", perfil: "I" },
      { texto: "«¿Cómo viviste esta situación?»", perfil: "E" },
      { texto: "«¿Cómo podríamos mostrar o contar esto?»", perfil: "A" },
      { texto: "«¿Cómo hacemos para que esta información llegue a más personas?»", perfil: "D" },
    ],
  },
  {
    texto: "En un trabajo grupal, probablemente serías quien:",
    opciones: [
      { texto: "Busca información y comprueba que los datos sean correctos.", perfil: "I" },
      { texto: "Habla con las personas y organiza los testimonios.", perfil: "E" },
      { texto: "Se ocupa de grabar, sacar fotos o editar.", perfil: "A" },
      { texto: "Piensa el título, la publicación y la estrategia para difundirlo.", perfil: "D" },
    ],
  },
  {
    texto: "¿Qué desafío elegirías?",
    opciones: [
      { texto: "Descubrir si una noticia viral es verdadera o falsa.", perfil: "I" },
      { texto: "Conseguir una buena respuesta de alguien que al principio no quiere hablar.", perfil: "E" },
      { texto: "Contar una noticia solamente con imágenes y sonidos.", perfil: "A" },
      { texto: "Explicar un tema complejo en un video de 30 segundos.", perfil: "D" },
    ],
  },
  {
    texto: "¿Qué título te gustaría producir?",
    opciones: [
      { texto: "«La información que no aparece en los primeros resultados de búsqueda».", perfil: "I" },
      { texto: "«La historia detrás de una persona común».", perfil: "E" },
      { texto: "«Así se vivió el evento: imágenes y voces de sus protagonistas».", perfil: "A" },
      { texto: "«Todo lo que tenés que saber, explicado en un minuto».", perfil: "D" },
    ],
  },
];


/* =========================================================================
   3. ESTADO
   Variables que cambian mientras el usuario hace el test.
   No hace falta tocar esto para modificar el contenido del test.
   ========================================================================= */
let preguntaActual = 0;
let puntos = { I: 0, E: 0, A: 0, D: 0 };


/* =========================================================================
   4. LÓGICA DEL TEST
   ========================================================================= */

// Muestra una de las tres pantallas (inicio / test / resultado) y oculta las demás.
function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach((pantalla) => {
    pantalla.classList.toggle("activa", pantalla.id === id);
  });
}

// Arranca el test: reinicia el estado y muestra la primera pregunta.
function iniciarTest() {
  preguntaActual = 0;
  puntos = { I: 0, E: 0, A: 0, D: 0 };
  mostrarPantalla("pantalla-test");
  renderizarPregunta();
}

// Dibuja en pantalla la pregunta actual (texto, opciones y barra de progreso).
function renderizarPregunta() {
  const total = PREGUNTAS.length;
  const pregunta = PREGUNTAS[preguntaActual];

  // Barra de progreso y contador "Pregunta X de Y"
  const porcentaje = (preguntaActual / total) * 100;
  document.getElementById("barra-relleno").style.width = porcentaje + "%";
  document.getElementById("progreso-texto").textContent =
    `Pregunta ${preguntaActual + 1} de ${total}`;

  // Texto de la pregunta
  document.getElementById("pregunta-texto").textContent = pregunta.texto;

  // Genera un botón por cada opción
  const contenedorOpciones = document.getElementById("opciones-contenedor");
  contenedorOpciones.innerHTML = "";
  pregunta.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.className = "opcion";
    boton.textContent = opcion.texto;
    boton.addEventListener("click", () => elegirOpcion(opcion.perfil, boton));
    contenedorOpciones.appendChild(boton);
  });
}

// Se ejecuta cuando el usuario elige una opción: suma el punto y avanza.
function elegirOpcion(perfil, botonElegido) {
  // Suma 1 punto al perfil correspondiente (acá está el sistema de puntuación)
  puntos[perfil]++;

  // Marca visualmente la opción elegida antes de pasar a la siguiente
  botonElegido.classList.add("seleccionada");

  setTimeout(() => {
    preguntaActual++;
    if (preguntaActual < PREGUNTAS.length) {
      renderizarPregunta();
    } else {
      mostrarResultado();
    }
  }, 250);
}

// Calcula qué perfil(es) ganaron y muestra la pantalla final.
function mostrarResultado() {
  // Barra de progreso al 100% antes de cambiar de pantalla
  document.getElementById("barra-relleno").style.width = "100%";

  // Busca el puntaje máximo entre los 4 perfiles
  const maximo = Math.max(...Object.values(puntos));

  // Junta todos los perfiles que llegaron a ese puntaje máximo (maneja empates)
  const ganadores = Object.keys(puntos).filter((clave) => puntos[clave] === maximo);

  // Toma el primer ganador para mostrarlo como resultado principal
  const perfilGanador = PERFILES[ganadores[0]];

  document.getElementById("resultado-emoji").textContent = perfilGanador.emoji;
  document.getElementById("resultado-titulo").textContent = `Tu perfil: ${perfilGanador.titulo}`;
  document.getElementById("resultado-descripcion").textContent = perfilGanador.descripcion;

  // Cartelito con el nombre del perfil (equivalente al "futuro periodista XXXX")
  document.getElementById("cartelito-final").textContent =
    `Este es solo tu perfil de hoy, futuro/a ${perfilGanador.titulo.toLowerCase()}. En Periodismo podés explorar todos estos caminos.`;

  // Si hubo empate entre dos o más perfiles, se muestra un aviso con todas las opciones
  const textoEmpate = document.getElementById("resultado-empate");
  if (ganadores.length > 1) {
    const nombresEmpatados = ganadores.map((clave) => PERFILES[clave].titulo).join(" y ");
    textoEmpate.textContent = `¡Empate! También tenés mucho de: ${nombresEmpatados}.`;
  } else {
    textoEmpate.textContent = "";
  }

  mostrarPantalla("pantalla-resultado");
}


/* =========================================================================
   5. EVENTOS
   Conecta los botones fijos del HTML (los que no se generan dinámicamente).
   ========================================================================= */
document.getElementById("btn-comenzar").addEventListener("click", iniciarTest);
document.getElementById("btn-reiniciar").addEventListener("click", iniciarTest);
