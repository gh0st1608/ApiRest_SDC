const express = require('express');
const router = express.Router();

const pedido = require('../controllers/pedido.controller.js');

router.get('/form',pedido.mostrar);
router.post('/save',pedido.guardar);

module.exports = router;