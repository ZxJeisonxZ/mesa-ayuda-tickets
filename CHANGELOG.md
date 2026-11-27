# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado semántico.

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
