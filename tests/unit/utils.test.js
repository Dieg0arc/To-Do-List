const generarId = require('../../src/utils/idGenerator');

describe('Generar ID único', () => {
  test('Genera un UUID v4 válido', () => {
    const id = generarId();
    expect(typeof id).toBe('string');
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});
