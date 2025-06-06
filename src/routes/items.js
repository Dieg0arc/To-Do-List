const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemsController');

router.get('/', controller.getAllItems);
router.get('/:id', controller.getItemById);
router.post('/', controller.createItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;
