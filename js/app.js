// Mesa de Ayuda - Lógica principal
// Versión 1.2.0: validación (HU-01), persistencia (HU-02) y gestión de estado y técnico (HU-03).

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

// HU-03: estados del ticket y técnicos disponibles
const ESTADOS = {
  abierto: { etiqueta: 'Abierto', clase: 'bg-emerald-100 text-emerald-700' },
  en_progreso: { etiqueta: 'En progreso', clase: 'bg-indigo-100 text-indigo-700' },
  resuelto: { etiqueta: 'Resuelto', clase: 'bg-teal-100 text-teal-700' },
  cerrado: { etiqueta: 'Cerrado', clase: 'bg-slate-200 text-slate-600' },
};

const TECNICOS = ['Laura Méndez', 'Carlos Ruiz', 'Andrea Torres', 'Julián Pérez'];

let tickets = Almacen.cargar();
let siguienteId = Almacen.siguienteId(tickets);

const form = document.getElementById('ticket-form');
const lista = document.getElementById('ticket-list');
const contador = document.getElementById('ticket-count');
const aviso = document.getElementById('aviso');

function escaparHTML(texto) {
  const mapa = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto ?? '').replace(/[&<>"']/g, (c) => mapa[c]);
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
}

let temporizadorAviso;
function mostrarAviso(mensaje, tipo = 'error') {
  const clases = tipo === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  aviso.className = `mb-3 text-sm border rounded-lg px-3 py-2 ${clases}`;
  aviso.textContent = mensaje;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.add('hidden'), 4000);
}

function persistir() {
  Almacen.guardar(tickets);
}

function crearTicket(datos) {
  const ahora = new Date().toISOString();
  const ticket = {
    id: siguienteId++,
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
    solicitante: datos.solicitante.trim(),
    prioridad: datos.prioridad,
    tipo: datos.tipo,
    estado: 'abierto',
    tecnico: '',
    creadoEn: ahora,
    actualizadoEn: ahora,
  };
  tickets.unshift(ticket);
  persistir();
  return ticket;
}

function eliminarTicket(id) {
  tickets = tickets.filter((t) => t.id !== id);
  persistir();
}

/**
 * HU-03: actualiza el estado o el técnico de un ticket aplicando las reglas de negocio.
 * @returns {string|null} Mensaje de error, o null si el cambio se aplicó.
 */
function actualizarTicket(id, cambios) {
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) return 'El ticket no existe.';
  if (ticket.estado === 'cerrado') return 'Un ticket cerrado no se puede modificar.';

  const nuevo = { ...ticket, ...cambios };
  if (!(nuevo.estado in ESTADOS)) return 'Estado no válido.';
  if (nuevo.tecnico && !TECNICOS.includes(nuevo.tecnico)) return 'Técnico no válido.';
  if (nuevo.estado === 'en_progreso' && !nuevo.tecnico) {
    return 'Asigna un técnico antes de pasar el ticket a "En progreso".';
  }

  Object.assign(ticket, cambios, { actualizadoEn: new Date().toISOString() });
  persistir();
  return null;
}

function opciones(valores, seleccionado) {
  return valores
    .map(([valor, etiqueta]) => `<option value="${escaparHTML(valor)}" ${valor === seleccionado ? 'selected' : ''}>${escaparHTML(etiqueta)}</option>`)
    .join('');
}

function renderTicket(t) {
  const prioridad = PRIORIDADES[t.prioridad] ?? PRIORIDADES.media;
  const estado = ESTADOS[t.estado] ?? ESTADOS.abierto;
  const cerrado = t.estado === 'cerrado';
  const bloqueo = cerrado ? 'disabled' : '';
  const opcionesEstado = opciones(Object.entries(ESTADOS).map(([k, v]) => [k, v.etiqueta]), t.estado);
  const opcionesTecnico = opciones([['', 'Sin asignar'], ...TECNICOS.map((n) => [n, n])], t.tecnico || '');

  return `
    <article class="bg-white rounded-xl shadow p-4 ${cerrado ? 'opacity-70' : ''}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs text-slate-400">#${t.id} &middot; ${formatearFecha(t.creadoEn)}</p>
          <h3 class="font-semibold">${escaparHTML(t.titulo)}</h3>
        </div>
        <div class="flex gap-2">
          <span class="text-xs font-medium px-2 py-1 rounded ${estado.clase}">${estado.etiqueta}</span>
          <span class="text-xs font-medium px-2 py-1 rounded ${prioridad.clase}">${prioridad.etiqueta}</span>
        </div>
      </div>
      <p class="text-sm text-slate-600 mt-2">${escaparHTML(t.descripcion)}</p>
      <div class="grid sm:grid-cols-2 gap-2 mt-3">
        <label class="text-xs text-slate-500">Estado
          <select data-campo="estado" data-id="${t.id}" class="mt-1 w-full border rounded-lg px-2 py-1 text-sm bg-white disabled:bg-slate-100" ${bloqueo}>${opcionesEstado}</select>
        </label>
        <label class="text-xs text-slate-500">Técnico asignado
          <select data-campo="tecnico" data-id="${t.id}" class="mt-1 w-full border rounded-lg px-2 py-1 text-sm bg-white disabled:bg-slate-100" ${bloqueo}>${opcionesTecnico}</select>
        </label>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-slate-500">
        <span>Solicitante: <strong>${escaparHTML(t.solicitante)}</strong> &middot; Tipo: ${TIPOS[t.tipo] ?? escaparHTML(t.tipo)}
          &middot; Actualizado: ${formatearFecha(t.actualizadoEn ?? t.creadoEn)}</span>
        <button data-accion="eliminar" data-id="${t.id}" class="text-red-600 hover:underline">Eliminar</button>
      </div>
    </article>`;
}

function mostrarErrores(errores) {
  form.querySelectorAll('[data-error]').forEach((p) => {
    const campo = p.dataset.error;
    const input = form.elements[campo];
    if (errores[campo]) {
      p.textContent = errores[campo];
      p.classList.remove('hidden');
      input?.classList.add('border-red-500');
    } else {
      p.textContent = '';
      p.classList.add('hidden');
      input?.classList.remove('border-red-500');
    }
  });
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
  const errores = Validacion.validarTicket(datos);
  mostrarErrores(errores);
  if (!Validacion.esValido(errores)) return;
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

// HU-03: cambios de estado y de técnico
lista.addEventListener('change', (e) => {
  const control = e.target.closest('[data-campo]');
  if (!control) return;
  const id = Number(control.dataset.id);
  const error = actualizarTicket(id, { [control.dataset.campo]: control.value });
  if (error) {
    mostrarAviso(error);
  } else {
    mostrarAviso(`Ticket #${id} actualizado.`, 'ok');
  }
  render();
});

render();
