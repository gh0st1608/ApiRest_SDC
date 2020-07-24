const botController = require('../controllers/index.js');
const botValidador = require('../validadores/index.js');
const mensaje = require('../model/mensaje.js');
const fs = require('fs');
const rutasBot = {};


rutasBot.mostrarPoliticas = (req,res) => {
 fs.readFile(
    '/home/ubuntu/sdc/public/html/politicasdeprivacidad.html',
    null,
    function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write('File not found');
      } else {
        res.write(data);
      }
      res.end();
    }
  );
}

rutasBot.validarConexionAPI = (req, res) => {
    console.log('entro a validarConexion API');
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    botController.ConexionApiFB(mode,token)
    .then(data => {
        res.status(200).send(challenge);
    })
    .catch(res.status(500))
}




rutasBot.index = (req,res) => {
    var evento = req.body;
    var tipoEvento = Object.keys(evento.entry[0].messaging[0])[3];

    switch (tipoEvento){
        case 'postback':
    botValidador.completarObjetoMensaje(evento)
    .then(objMensaje => {
    console.log('--objeto mensaje--')
    console.log(objMensaje);
    console.log('-----')
    botValidador.direccionarFlujo(objMensaje)
    .then(objMensajeFiltrado => {
    console.log('--objeto mensaje Filtrado--')
    console.log(objMensajeFiltrado);
    console.log('-----')
    botValidador.obtenerIdPostback(objMensaje)
    .then(objMensajeMod => {
    console.log('-obtenerIdPostback-')
    console.log(objMensajeMod);
    console.log('-----')
    botValidador.obtenerTiposProductoMP(objMensajeMod)
    .then(dataRespuesta => {
    console.log('-obtenerTiposProductoMP-')
    console.log(dataRespuesta);
    console.log('-----')
    botValidador.obtenerMensajeFinal(objMensaje.senderID,dataRespuesta,objMensaje.tipoRespuesta)
    .then(mensajeFinal => {
    console.log('-obtenerMensajeFinal-')
    console.log(mensajeFinal);
    console.log('-----')
    botController.realizarPeticionAPI(mensajeFinal)
    .then(mensajeJson => {
    console.log('-realizarPeticionAPI-')
    console.log(mensajeJson);
    console.log('-----')
    botValidador.limpiarObjetoMensaje(objMensaje)
    .then(objMensaje => {
    console.log('--objeto limpio-');
    console.log(objMensaje);
    console.log('--------');
                                })
                            })
                        })
                    })
                })    
            })         
        })
    res.sendStatus(200);
    break;

    case 'message':
    botValidador.completarObjetoMensaje(evento)
    .then(objMensaje => {
    console.log('--objeto mensaje--')
    console.log(objMensaje);
    console.log('-----')
    botValidador.direccionarFlujo(objMensaje)
    .then(objMensajeFiltrado=> {
    console.log('--objeto mensaje Filtrado---');
    console.log(objMensajeFiltrado);
    console.log('-----');
    botValidador.obtenerTipoRespuesta(objMensajeFiltrado)
    .then(dataRespuesta => {
    console.log('-obtenerProductos-')
    console.log(dataRespuesta);
    console.log('-----')
    botValidador.obtenerMensajeFinal(objMensajeFiltrado.senderID,dataRespuesta,objMensajeFiltrado.tipoRespuesta)
    .then(mensajeFinal => {
    console.log('-obtenerMensajeFinal-')
    console.log(mensajeFinal);
    console.log('-----')
    botController.realizarPeticionAPI(mensajeFinal)
    .then(data7 => {
    console.log('-realizarPeticionAPI-')
    console.log(data7);
    console.log('-----')
    botValidador.limpiarObjetoMensaje(objMensaje)
    .then(objMensaje => {
    console.log('--objeto limpio-');
    console.log(objMensaje);
    console.log('--------');
                        })
                    })
                })  
            })
        })
    })
    res.sendStatus(200);
    break;

    }
}



module.exports = rutasBot;
