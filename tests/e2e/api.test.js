const request = require('supertest');
const express = require('express');
const itemsRouter = require('../../src/routes/items');

// App Express para E2E
const app = express();
app.use(express.json());
app.use('/items', itemsRouter);

describe('Pruebas E2E - API To-Do List', () => {
  test('GET /items retorna lista y status 200', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
    test('POST /items crea tarea y retorna 201 con datos', async () => {
    const response = await request(app).post('/items').send({
      title: 'Tarea E2E',
      description: 'Prueba end-to-end'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Tarea E2E');
    expect(response.body.description).toBe('Prueba end-to-end');
  });
    test('DELETE /items/:id elimina y GET /items/:id retorna 404', async () => {
    // Crear tarea
    const crear = await request(app).post('/items').send({
      title: 'Tarea a eliminar E2E',
      description: 'Debe ser eliminada'
    });

    const id = crear.body.id;

    // Eliminar tarea
    const eliminar = await request(app).delete(`/items/${id}`);
    expect(eliminar.statusCode).toBe(204);

    // Verificar que ya no existe
    const buscar = await request(app).get(`/items/${id}`);
    expect(buscar.statusCode).toBe(404);
  });
});
