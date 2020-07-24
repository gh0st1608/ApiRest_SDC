const express = require('express');
const bot = require('../routes/bot.js');
const wsp = require('../routes/wsp.js');
const router = express.Router()

router
  .get('/webhook', bot.validarConexionAPI)
  .post('/webhook', bot.index)
  .get('/politicas', bot.mostrarPoliticas)
  .post('/webhookWsp',wsp.reconocerIntent)

 console.log('entro a llamas rutas'); 

module.exports = router