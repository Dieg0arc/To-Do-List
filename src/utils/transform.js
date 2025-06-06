function formatearFecha(fechaISO) {
  if (typeof fechaISO !== 'string') return null;

  const fecha = new Date(fechaISO);
  if (isNaN(fecha.getTime())) return null;

  return fecha.toISOString().split('T')[0];
}

module.exports = { formatearFecha };
