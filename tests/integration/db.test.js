const request = require('supertest');
const express = require('express');
const itemsRouter = require('../../src/routes/items');
const db = require('../../src/db');

// App de prueba aislada
const app = express();
app.use(express.json());
app.use('/items', itemsRouter);

describe('Pruebas de integración - Base de datos', () => {
  let idCreado;

  test('Inserta un registro en la base de datos', async () => {
    const respuesta = await request(app).post('/items').send({
      title: 'Tarea integración',
      description: 'Registrar tarea en test'
    });

    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body).toHaveProperty('id');
    expect(respuesta.body.title).toBe('Tarea integración');

    idCreado = respuesta.body.id;
  });
    test('Consulta registros de la base de datos', async () => {
    const respuesta = await request(app).get('/items');

    expect(respuesta.statusCode).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
    expect(respuesta.body.length).toBeGreaterThan(0);
  });
    test('Elimina un registro de la base de datos', async () => {
    // Crear tarea
    const crear = await request(app).post('/items').send({
      title: 'Tarea a eliminar',
      description: 'Temporal para prueba'
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
