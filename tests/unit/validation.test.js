const { validarTitulo } = require('../../src/utils/validate');

describe('Validar título de tarea', () => {
  test('Rechaza títulos vacíos o inválidos', () => {
    expect(validarTitulo('')).toBe(false);
    expect(validarTitulo('   ')).toBe(false);
    expect(validarTitulo(null)).toBe(false);
    expect(validarTitulo(undefined)).toBe(false);
    expect(validarTitulo(123)).toBe(false);
  });

  test('Acepta títulos válidos', () => {
    expect(validarTitulo('Hacer la tarea')).toBe(true);
    expect(validarTitulo('  Comprar pan')).toBe(true);
  });
});
