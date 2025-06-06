function validarTitulo(titulo) {
  return typeof titulo === 'string' && titulo.trim().length > 0;
}

module.exports = { validarTitulo };
