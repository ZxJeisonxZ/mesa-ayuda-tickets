// HU-02 · Persistencia de tickets (mantenimiento perfectivo)
// Guarda y recupera los tickets en el localStorage del navegador.

const Almacen = {
  CLAVE: 'mesa-ayuda:tickets',

  /**
   * Carga los tickets guardados.
   * Si no hay datos o están corruptos, retorna un arreglo vacío.
   * @returns {Array}
   */
  cargar() {
    try {
      const crudo = localStorage.getItem(this.CLAVE);
      if (!crudo) return [];
      const datos = JSON.parse(crudo);
      return Array.isArray(datos) ? datos : [];
    } catch (error) {
      console.warn('[Almacen] Datos guardados inválidos, se inicia vacío.', error);
      return [];
    }
  },

  /**
   * Guarda la lista completa de tickets.
   * @param {Array} tickets
   * @returns {boolean} true si se guardó correctamente.
   */
  guardar(tickets) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(tickets));
      return true;
    } catch (error) {
      console.error('[Almacen] No se pudieron guardar los tickets.', error);
      return false;
    }
  },

  /**
   * Calcula el siguiente consecutivo a partir de los tickets existentes.
   * @param {Array} tickets
   * @returns {number}
   */
  siguienteId(tickets) {
    return tickets.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0) + 1;
  },
};
