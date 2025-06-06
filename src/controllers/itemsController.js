const db = require('../db');
const { v4: uuidv4 } = require('uuid');

exports.getAllItems = (req, res) => {
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json(item);
};

exports.createItem = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'El título es requerido' });

  const id = uuidv4();
  const stmt = db.prepare('INSERT INTO items (id, title, description) VALUES (?, ?, ?)');
  stmt.run(id, title, description || null);

  res.status(201).json({ id, title, description });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM items WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Item no encontrado' });
  res.status(204).send();
};
