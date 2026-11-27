# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado semántico.

## [1.3.0] - HU-04 (mantenimiento perfectivo)

### Agregado
- Búsqueda por texto en título, descripción y solicitante (sin distinguir mayúsculas ni tildes).
- Filtros por estado y por prioridad, con botón para limpiarlos.
- El contador muestra "Mostrando X de Y".
- Módulo `js/filters.js`.

## [1.2.0] - HU-03 (mantenimiento perfectivo)

### Agregado
- Cambio de estado del ticket: Abierto, En progreso, Resuelto y Cerrado.
- Asignación de técnico responsable.
- Fecha de última actualización en cada ticket.
- Mensajes de aviso para confirmar cambios o informar errores.

### Reglas de negocio
- No se puede pasar a "En progreso" sin técnico asignado.
- Un ticket cerrado no se puede modificar.

## [1.1.0] - HU-02 (mantenimiento perfectivo)

### Agregado
- Persistencia de tickets en `localStorage`: se conservan al recargar o cerrar el navegador.
- El consecutivo de los tickets continúa desde el último guardado.
- Módulo `js/storage.js`.

## [1.0.1] - HU-01 (mantenimiento correctivo)

### Corregido
- El formulario ya no permite registrar tickets sin título, descripción o solicitante.
- Se validan longitudes mínimas y máximas, y los errores se muestran debajo de cada campo.

### Agregado
- Módulo `js/validation.js`.

## [1.0.0]

### Agregado
- Registro de tickets con título, descripción, solicitante, prioridad y tipo de mantenimiento.
- Listado de tickets con fecha de creación.
- Eliminación de tickets.

### Problemas conocidos
- El formulario permite registrar tickets vacíos (se corrige en HU-01).
- Los tickets se pierden al recargar la página (se corrige en HU-02).
