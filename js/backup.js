// HU-05 · Respaldo y restauración (mantenimiento preventivo)
// Exporta e importa los tickets en un archivo JSON para prevenir pérdida de datos.

const Respaldo = {
  VERSION_FORMATO: 1,
  CAMPOS_OBLIGATORIOS: ['id', 'titulo', 'descripcion', 'solicitante', 'prioridad', 'tipo', 'estado', 'creadoEn'],

  /**
   * Descarga un archivo JSON con todos los tickets.
   * @param {Array} tickets
   */
  exportar(tickets) {
    const hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    const contenido = {
      aplicacion: 'mesa-ayuda',
      versionFormato: this.VERSION_FORMATO,
      exportadoEn: new Date().toISOString(),
      tickets,
    };
    const blob = new Blob([JSON.stringify(contenido, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `tickets-respaldo-${fecha}.json`;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    URL.revokeObjectURL(url);
  },

  /**
   * Valida la estructura de un respaldo.
   * @param {*} datos - Contenido ya convertido desde JSON.
   * @returns {Array} Tickets válidos.
   * @throws {Error} Si la estructura no es válida.
   */
  validar(datos) {
    if (!datos || datos.aplicacion !== 'mesa-ayuda' || !Array.isArray(datos.tickets)) {
      throw new Error('El archivo no es un respaldo de Mesa de Ayuda.');
    }
    datos.tickets.forEach((t, i) => {
      const faltantes = this.CAMPOS_OBLIGATORIOS.filter((campo) => !(campo in t));
      if (faltantes.length) {
        throw new Error(`El ticket en la posición ${i + 1} no tiene: ${faltantes.join(', ')}.`);
      }
    });
    return datos.tickets;
  },

  /**
   * Lee y valida un archivo de respaldo.
   * @param {File} archivo
   * @returns {Promise<Array>} Tickets del respaldo.
   */
  async importar(archivo) {
    const texto = await archivo.text();
    let datos;
    try {
      datos = JSON.parse(texto);
    } catch {
      throw new Error('El archivo no contiene un JSON válido.');
    }
    return this.validar(datos);
  },
};
