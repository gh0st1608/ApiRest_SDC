const express = require('express');
const router = express.Router();

const pedido = require('../controllers/pedido.controller.js');

router.get('/form',pedido.mostrarFormulario);
router.post('/save',pedido.guardarPedido);
router.get('/pedidos',pedido.listarPedido);

module.exports = router;