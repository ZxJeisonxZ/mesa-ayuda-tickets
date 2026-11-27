// HU-01 · Validación del formulario (mantenimiento correctivo)
// Corrige el defecto de la v1.0.0 que permitía registrar tickets vacíos.

const Validacion = {
  reglas: {
    tituloMin: 5,
    tituloMax: 80,
    descripcionMin: 10,
  },

  /**
   * Valida los datos de un ticket.
   * @param {Object} datos - Campos del formulario.
   * @returns {Object} Errores por campo. Vacío si todo es válido.
   */
  validarTicket(datos) {
    const errores = {};
    const titulo = (datos.titulo || '').trim();
    const descripcion = (datos.descripcion || '').trim();
    const solicitante = (datos.solicitante || '').trim();

    if (!titulo) {
      errores.titulo = 'El título es obligatorio.';
    } else if (titulo.length < this.reglas.tituloMin) {
      errores.titulo = `El título debe tener al menos ${this.reglas.tituloMin} caracteres.`;
    } else if (titulo.length > this.reglas.tituloMax) {
      errores.titulo = `El título no puede superar ${this.reglas.tituloMax} caracteres.`;
    }

    if (!descripcion) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (descripcion.length < this.reglas.descripcionMin) {
      errores.descripcion = `La descripción debe tener al menos ${this.reglas.descripcionMin} caracteres.`;
    }

    if (!solicitante) {
      errores.solicitante = 'El solicitante es obligatorio.';
    }

    if (!(datos.prioridad in PRIORIDADES)) {
      errores.prioridad = 'Selecciona una prioridad válida.';
    }

    if (!(datos.tipo in TIPOS)) {
      errores.tipo = 'Selecciona un tipo válido.';
    }

    return errores;
  },

  esValido(errores) {
    return Object.keys(errores).length === 0;
  },
};
