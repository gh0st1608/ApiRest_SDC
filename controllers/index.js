const request = require('request');
const config = require('../config/config.js');
const daoBot = require('../dao/index.js');
const controllerRequestBot = {};


controllerRequestBot.ConexionApiFB = (mode,token) => {
  console.log('entro a conexionApiFB');
  return new Promise((resolve,reject) => {
    if (mode === 'subscribe' && token === config.TOKEN_FB) {
      resolve(config.TOKEN_FB);
    }
      reject('peticion rechazada'); 
})
}




controllerRequestBot.direccionarTipoPeticion = (tipoEvento) => {
  return new Promise ((resolve,reject) => {
    //resolve(validadorBot.procesarTipoMensaje(evento,tipoEvento))
    resolve(tipoEvento); //message,postback
    reject('peticion errada');
  })
}

controllerRequestBot.realizarPeticionAPI = (mensajeRespuesta) => {
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.TOKEN_FB },
      method: 'POST',
      json: mensajeRespuesta,
    },function (error){
      if (error) {
        console.log('No es posible enviar el mensaje');
      } else {
        console.log('El mensaje ha sido enviado');
    }
  })
  return new Promise((resolve,reject) => {
    resolve(mensajeRespuesta);
  })
}



module.exports = controllerRequestBot;