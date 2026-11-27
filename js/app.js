// Mesa de Ayuda - Lógica principal
// Versión 1.0.0: registro, listado y eliminación de tickets (solo en memoria).

const PRIORIDADES = {
  baja: { etiqueta: 'Baja', clase: 'bg-slate-100 text-slate-700' },
  media: { etiqueta: 'Media', clase: 'bg-sky-100 text-sky-700' },
  alta: { etiqueta: 'Alta', clase: 'bg-amber-100 text-amber-800' },
  critica: { etiqueta: 'Crítica', clase: 'bg-red-100 text-red-700' },
};

const TIPOS = {
  correctivo: 'Correctivo',
  adaptativo: 'Adaptativo',
  perfectivo: 'Perfectivo',
  preventivo: 'Preventivo',
};

let tickets = [];
let siguienteId = 1;

const form = document.getElementById('ticket-form');
const lista = document.getElementById('ticket-list');
const contador = document.getElementById('ticket-count');

function escaparHTML(texto) {
  const mapa = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto ?? '').replace(/[&<>"']/g, (c) => mapa[c]);
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

function crearTicket(datos) {
  const ticket = {
    id: siguienteId++,
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
    solicitante: datos.solicitante.trim(),
    prioridad: datos.prioridad,
    tipo: datos.tipo,
    estado: 'abierto',
    creadoEn: new Date().toISOString(),
  };
  tickets.unshift(ticket);
  return ticket;
}

function eliminarTicket(id) {
  tickets = tickets.filter((t) => t.id !== id);
}

function renderTicket(t) {
  const prioridad = PRIORIDADES[t.prioridad] ?? PRIORIDADES.media;
  return `
    <article class="bg-white rounded-xl shadow p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs text-slate-400">#${t.id} &middot; ${formatearFecha(t.creadoEn)}</p>
          <h3 class="font-semibold">${escaparHTML(t.titulo)}</h3>
        </div>
        <span class="text-xs font-medium px-2 py-1 rounded ${prioridad.clase}">${prioridad.etiqueta}</span>
      </div>
      <p class="text-sm text-slate-600 mt-2">${escaparHTML(t.descripcion)}</p>
      <div class="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-slate-500">
        <span>Solicitante: <strong>${escaparHTML(t.solicitante)}</strong> &middot; Tipo: ${TIPOS[t.tipo] ?? t.tipo}</span>
        <button data-accion="eliminar" data-id="${t.id}" class="text-red-600 hover:underline">Eliminar</button>
      </div>
    </article>`;
}

function render() {
  contador.textContent = `${tickets.length} ticket(s)`;
  if (tickets.length === 0) {
    lista.innerHTML = '<p class="text-center text-slate-400 bg-white rounded-xl shadow p-6">No hay tickets registrados.</p>';
    return;
  }
  lista.innerHTML = tickets.map(renderTicket).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form));
  crearTicket(datos);
  form.reset();
  render();
});

lista.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-accion]');
  if (!boton) return;
  const id = Number(boton.dataset.id);
  if (boton.dataset.accion === 'eliminar') {
    eliminarTicket(id);
    render();
  }
});

render();
