const { formatearFecha } = require('../../src/utils/transform');

describe('Formatear fecha', () => {
  test('Convierte una fecha válida ISO a formato YYYY-MM-DD', () => {
    expect(formatearFecha('2025-06-05T15:30:00Z')).toBe('2025-06-05');
  });

  test('Devuelve null si la fecha es inválida', () => {
    expect(formatearFecha('no-es-una-fecha')).toBeNull();
    expect(formatearFecha(null)).toBeNull();
  });
});
