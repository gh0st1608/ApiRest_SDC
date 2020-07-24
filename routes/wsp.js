var solicitud = require('../model/solWebhook.js');
var validador = require('../validadores/wsp.js');
rutasWsp = {};


rutasWsp.reconocerIntent = function(req,res){

        if ( typeof req.body.queryResult.intent.displayName !== 'undefined' ){
                solicitud.textoSolicitud = req.body.queryResult.queryText;
                solicitud.tipoIntencion = req.body.queryResult.intent.displayName;
                solicitud.tipoParametro = req.body.queryResult.parameters;
                solicitud.valorParametro = req.body.queryResult.parameters.Consulta
                //solicitud.tipoRespuesta = ''; solo si se puede enviar imagenes,audios,etc
                console.log(solicitud);
                validador.asignarRespuesta(solicitud)
                .then(objRespuesta => {
                console.log(objRespuesta);
                res.json(objRespuesta)
                validador.limpiarObjetoRespuesta(objRespuesta)
                .then(objRespuestaLimpio => {
                console.log(objRespuestaLimpio);
                    }
                )
              }
            )    
        }

    res.status(200);

}

module.exports=rutasWsp;
  
