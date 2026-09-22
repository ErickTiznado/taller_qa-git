/* Tareas del taller — estado en memoria + localStorage, sin dependencias. */

const CLAVE = 'taller-tareas';

const SEMILLA = [
  { titulo: 'Clonar el repo del taller', prioridad: 'alta', completada: true },
  { titulo: 'Crear una issue con la plantilla de bug', prioridad: 'alta', completada: false },
  { titulo: 'Abrir una rama con el número de la issue', prioridad: 'media', completada: false },
  { titulo: 'Escribir un commit que cierre la issue', prioridad: 'media', completada: false },
  { titulo: 'Vincular el commit con Closes #N', prioridad: 'alta', completada: false },
  { titulo: 'Abrir el pull request y pedir revisión', prioridad: 'media', completada: false },
  { titulo: 'Mover la tarjeta a "En revisión" en el tablero', prioridad: 'baja', completada: false },
  { titulo: 'Borrar la rama después del merge', prioridad: 'baja', completada: false },
];

const PRIORIDADES = ['alta', 'media', 'baja'];

const NOMBRE_PRIORIDAD = { alta: 'Alta', media: 'Media', baja: 'Baja' };

const TITULOS = {
  todas: 'Todas las tareas',
  pendientes: 'Pendientes',
  completadas: 'Completadas',
};

let tareas = cargar();
let filtro = 'todas';
let prioridad = 'todas';
/* id de la tarea recién marcada: solo esa estampa el tilde */
let recienEstampada = null;

const grupos = document.getElementById('grupos');
const vacio = document.getElementById('vacio');
const form = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('input-titulo');
const inputPrioridad = document.getElementById('input-prioridad');
const btnAgregar = document.getElementById('btn-agregar');
const btnLimpiar = document.getElementById('limpiar');
const contador = document.getElementById('contador');
const tituloVista = document.getElementById('titulo-vista');
const fecha = document.getElementById('fecha');
const avanceTexto = document.getElementById('avance-texto');
const avanceLleno = document.getElementById('avance-lleno');

/* ------------------------------------------------------------------ datos */

function nuevaTarea(titulo, prio, completada = false) {
  return {
    id: crypto.randomUUID(),
    titulo,
    prioridad: prio,
    completada,
    creada: new Date().toISOString(),
  };
}

function cargar() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo === null) {
      return SEMILLA.map((t) => nuevaTarea(t.titulo, t.prioridad, t.completada));
    }
    const datos = JSON.parse(crudo);
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch {
    /* modo privado o cuota llena: la app sigue andando en memoria */
  }
}

function agregar(titulo, prio) {
  tareas.unshift(nuevaTarea(titulo, prio));
  guardar();
  render();
}

function alternar(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return;
  tarea.completada = !tarea.completada;
  recienEstampada = tarea.completada ? tarea.id : null;
  guardar();
  render();
}

function eliminar(id) {
  tareas = tareas.filter((t) => t.id !== id);
  guardar();
  render();
}

function porEstado(lista, cual) {
  if (cual === 'pendientes') return lista.filter((t) => !t.completada);
  if (cual === 'completadas') return lista.filter((t) => t.completada);
  return lista;
}

function visibles() {
  const porFiltro = porEstado(tareas, filtro);
  if (prioridad === 'todas') return porFiltro;
  return porFiltro.filter((t) => t.prioridad === prioridad);
}

/* ------------------------------------------------------------------ piezas */

function icono(id) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#' + id);
  svg.setAttribute('aria-hidden', 'true');
  svg.append(use);
  return svg;
}

function fila(tarea, indice) {
  const li = document.createElement('li');
  li.className = 'tarea' + (tarea.completada ? ' completada' : '');
  li.dataset.id = tarea.id;

  const numero = document.createElement('span');
  numero.className = 'indice';
  numero.setAttribute('aria-hidden', 'true');
  numero.textContent = String(indice).padStart(2, '0');

  const caja = document.createElement('label');
  caja.className = 'caja';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = tarea.completada;
  check.setAttribute('aria-label', 'Marcar "' + tarea.titulo + '" como completada');
  check.addEventListener('change', () => alternar(tarea.id));

  const marco = document.createElement('span');
  marco.className = 'marco' + (tarea.id === recienEstampada ? ' estampando' : '');
  marco.append(icono('i-check'));
  caja.append(check, marco);

  const texto = document.createElement('span');
  texto.className = 'titulo-tarea';
  texto.textContent = tarea.titulo;

  const borrar = document.createElement('button');
  borrar.type = 'button';
  borrar.className = 'borrar';
  borrar.setAttribute('aria-label', 'Eliminar "' + tarea.titulo + '"');
  borrar.append(icono('i-trash'));
  borrar.addEventListener('click', () => eliminar(tarea.id));

  li.append(numero, caja, texto, borrar);
  return li;
}

function grupo(prio, items, desde) {
  const section = document.createElement('section');
  section.className = 'grupo ' + prio;

  const encabezado = document.createElement('div');
  encabezado.className = 'grupo-encabezado';

  const h2 = document.createElement('h2');
  h2.className = 'grupo-titulo';
  h2.textContent = NOMBRE_PRIORIDAD[prio];

  const cuenta = document.createElement('span');
  cuenta.className = 'grupo-cuenta';
  cuenta.textContent = String(items.length);

  encabezado.append(h2, cuenta);

  const ul = document.createElement('ul');
  ul.className = 'lista';
  ul.append(...items.map((t, i) => fila(t, desde + i + 1)));

  section.append(encabezado, ul);
  return section;
}

/* ------------------------------------------------------------------ render */

function cifra(n) {
  const span = document.createElement('span');
  span.className = 'cifra';
  span.textContent = String(n);
  return span;
}

function separador() {
  const span = document.createElement('span');
  span.className = 'sep';
  span.textContent = '·';
  return span;
}

function renderContador() {
  const mostradas = tareas.length;
  const total = tareas.length;
  const pendientes = tareas.filter((t) => !t.completada).length;

  contador.replaceChildren(
    cifra(mostradas),
    document.createTextNode(' de '),
    cifra(total),
    document.createTextNode(' visibles'),
    separador(),
    cifra(pendientes),
    document.createTextNode(' pendientes'),
  );
}

function renderMargen() {
  const cuentas = {
    todas: tareas.length,
    pendientes: porEstado(tareas, 'pendientes').length,
    completadas: porEstado(tareas, 'completadas').length,
    'p-todas': porEstado(tareas, filtro).length,
  };
  for (const p of PRIORIDADES) {
    cuentas['p-' + p] = porEstado(tareas, filtro).filter((t) => t.prioridad === p).length;
  }

  for (const [clave, valor] of Object.entries(cuentas)) {
    const nodo = document.querySelector('[data-cuenta="' + clave + '"]');
    if (nodo) nodo.textContent = String(valor);
  }

  const hechas = cuentas.completadas;
  const total = cuentas.todas;
  const razon = total === 0 ? 0 : hechas / total;

  avanceTexto.textContent = total === 0
    ? 'Sin tareas todavía'
    : hechas + ' de ' + total + ' completadas';
  avanceLleno.style.inlineSize = (razon * 100).toFixed(1) + '%';
}

function renderEncabezado() {
  tituloVista.textContent = TITULOS[filtro];

  const hoy = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  fecha.textContent = prioridad === 'todas'
    ? hoy
    : hoy + ' — prioridad ' + NOMBRE_PRIORIDAD[prioridad].toLowerCase();
}

function mensajeVacio() {
  if (tareas.length === 0) return 'Todavía no hay tareas. Escribí la primera arriba.';
  if (prioridad !== 'todas') {
    return 'No hay tareas de prioridad ' + NOMBRE_PRIORIDAD[prioridad].toLowerCase() +
           ' en esta vista.';
  }
  if (filtro === 'pendientes') return 'No queda nada pendiente. Buen momento para hacer commit.';
  if (filtro === 'completadas') return 'Ninguna tarea completada todavía.';
  return 'Todavía no hay tareas. Escribí la primera arriba.';
}

function render() {
  const enPantalla = visibles();

  const secciones = [];
  let contados = 0;
  for (const p of PRIORIDADES) {
    const items = enPantalla.filter((t) => t.prioridad === p);
    if (items.length === 0) continue;
    secciones.push(grupo(p, items, contados));
    contados += items.length;
  }
  grupos.replaceChildren(...secciones);

  vacio.hidden = enPantalla.length > 0;
  vacio.textContent = mensajeVacio();

  btnLimpiar.disabled = !tareas.some((t) => t.completada);
  recienEstampada = null;

  renderEncabezado();
  renderMargen();
  renderContador();
}

/* ------------------------------------------------------------------ eventos */

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = inputTitulo.value.trim();
  if (!titulo) return;
  agregar(titulo, inputPrioridad.value);
  inputTitulo.value = '';
  btnAgregar.disabled = true;
  inputTitulo.focus();
});

inputTitulo.addEventListener('input', () => {
  btnAgregar.disabled = inputTitulo.value.trim() === '';
});

document.querySelector('.nav-vistas').addEventListener('click', (e) => {
  const boton = e.target.closest('[data-filtro]');
  if (!boton) return;
  filtro = boton.dataset.filtro;
  document.querySelectorAll('[data-filtro]').forEach((b) => {
    const activo = b === boton;
    b.classList.toggle('activo', activo);
    if (activo) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  render();
});

document.querySelector('.nav-prioridades').addEventListener('click', (e) => {
  const boton = e.target.closest('[data-prioridad]');
  if (!boton) return;
  const elegida = boton.dataset.prioridad;
  /* volver a tocar la activa quita el filtro */
  prioridad = prioridad === elegida ? 'todas' : elegida;
  document.querySelectorAll('[data-prioridad]').forEach((b) => {
    const activo = b.dataset.prioridad === prioridad;
    b.classList.toggle('activo', activo);
    b.setAttribute('aria-pressed', String(activo));
  });
  render();
});

btnLimpiar.addEventListener('click', () => {
  tareas = tareas.filter((t) => !t.completada);
  guardar();
  render();
});

render();
