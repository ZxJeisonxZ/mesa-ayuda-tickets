// HU-04 · Búsqueda y filtros (mantenimiento perfectivo)
// Filtra los tickets por texto, estado y prioridad.

const Filtros = {
  /**
   * Normaliza un texto: minúsculas y sin tildes.
   * @param {string} texto
   * @returns {string}
   */
  normalizar(texto) {
    return String(texto ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  },

  /**
   * Aplica los criterios de búsqueda a la lista de tickets.
   * @param {Array} tickets
   * @param {{texto?: string, estado?: string, prioridad?: string}} criterios
   * @returns {Array} Tickets que cumplen todos los criterios.
   */
  aplicar(tickets, { texto = '', estado = '', prioridad = '' } = {}) {
    const busqueda = this.normalizar(texto.trim());
    return tickets.filter((t) => {
      if (estado && t.estado !== estado) return false;
      if (prioridad && t.prioridad !== prioridad) return false;
      if (!busqueda) return true;
      const contenido = this.normalizar(`${t.titulo} ${t.descripcion} ${t.solicitante}`);
      return contenido.includes(busqueda);
    });
  },
};
