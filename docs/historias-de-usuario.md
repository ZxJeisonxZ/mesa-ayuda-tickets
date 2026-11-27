# Historias de usuario - Mesa de Ayuda

Cada historia se implementa en su propia rama `feature/HU-XX-...`, se integra a `develop` mediante Pull Request, se valida en `qa` y se libera en `main`.

| ID | Historia | Tipo de mantenimiento | Rama | Versión | Estado |
|----|----------|-----------------------|------|---------|--------|
| HU-01 | Validación del formulario | Correctivo | `feature/HU-01-validacion-formulario` | 1.0.1 | Implementada |
| HU-02 | Persistencia de tickets | Perfectivo | `feature/HU-02-persistencia` | 1.1.0 | Implementada |
| HU-03 | Gestión de estado y técnico asignado | Perfectivo | `feature/HU-03-estado-asignacion` | 1.2.0 | Implementada |
| HU-04 | Búsqueda y filtros | Perfectivo | `feature/HU-04-busqueda-filtros` | 1.3.0 | Implementada |
| HU-05 | Respaldo y restauración | Preventivo | `feature/HU-05-respaldo` | 1.4.0 | Pendiente |

---

## HU-01 · Validación del formulario (correctivo)

**Como** agente de mesa de ayuda
**quiero** que el sistema no permita registrar tickets incompletos
**para** evitar solicitudes vacías que no se pueden atender.

**Defecto que corrige:** en la versión 1.0.0 el formulario permite registrar tickets sin título, sin descripción y sin solicitante.

**Criterios de aceptación**

- [x] El título es obligatorio y debe tener entre 5 y 80 caracteres.
- [x] La descripción es obligatoria y debe tener al menos 10 caracteres.
- [x] El solicitante es obligatorio.
- [x] Cada error se muestra debajo de su campo y el ticket no se registra.
- [x] Los errores desaparecen cuando el ticket se registra correctamente.

---

## HU-02 · Persistencia de tickets (perfectivo)

**Como** agente de mesa de ayuda
**quiero** que los tickets se conserven al recargar o cerrar el navegador
**para** no perder la información registrada.

**Criterios de aceptación**

- [x] Los tickets se guardan en `localStorage` cada vez que se crean, modifican o eliminan.
- [x] Al abrir la aplicación se cargan los tickets guardados.
- [x] Los consecutivos (#ID) continúan desde el último ticket guardado.
- [x] Si los datos guardados están corruptos, la aplicación inicia vacía sin fallar.

---

## HU-03 · Gestión de estado y técnico asignado (perfectivo)

**Como** coordinador de soporte
**quiero** cambiar el estado de un ticket y asignarle un técnico
**para** hacer seguimiento al avance de cada solicitud.

**Criterios de aceptación**

- [x] Estados disponibles: Abierto, En progreso, Resuelto y Cerrado.
- [x] Se puede asignar un técnico desde una lista.
- [x] Un ticket no puede pasar a "En progreso" sin técnico asignado.
- [x] Un ticket cerrado ya no se puede modificar.
- [x] Se registra la fecha de la última actualización.

---

## HU-04 · Búsqueda y filtros (perfectivo)

**Como** agente de mesa de ayuda
**quiero** buscar y filtrar tickets
**para** encontrar rápido las solicitudes que debo atender.

**Criterios de aceptación**

- [x] Búsqueda por texto en título, descripción y solicitante (sin distinguir mayúsculas ni tildes).
- [x] Filtro por estado y por prioridad.
- [x] El contador muestra "Mostrando X de Y".
- [x] Botón para limpiar los filtros.

---

## HU-05 · Respaldo y restauración (preventivo)

**Como** administrador de la mesa de ayuda
**quiero** exportar e importar los tickets en un archivo JSON
**para** prevenir la pérdida de información si se borran los datos del navegador.

**Criterios de aceptación**

- [ ] Botón "Exportar respaldo" que descarga `tickets-respaldo-AAAA-MM-DD.json`.
- [ ] Botón "Importar respaldo" que carga un archivo JSON.
- [ ] Se valida la estructura del archivo antes de importarlo y se informa si no es válido.
- [ ] Se pide confirmación antes de reemplazar los tickets actuales.
