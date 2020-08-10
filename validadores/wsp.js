const objRespuesta = require('../model/resWebhook');
const dataAccessPedido = require('../dao/wsp.js');
validadorWsp = {};

var msjBienvenida = 'Gracias por comunicarte con SABORES DE CASMA.\n' +
'Escriba el numero de la opcion que necesite para poder atenderlo.\n' +
'1. Ver Carta\n' +
'2. Realizar Pedido\n' +
'Gracias por su preferencia'

envioPdf = 'Click aquì --> ' + 'https://url2.cl/plcm8 \n' +
'para poder ver nuestra Carta Oficial' + '\n' + 
'Tambien puede Consultar de manera facil y sencilla \n' +
'en nuestra inbox de facebook messenger --> m.me/1685945551714503' + '\n' +
'Gracias por su preferencia'

strRealizarPedido = 'Para poder realizar su pedido por favor registrelo en nuestro sistema \n' + 
'en el siguiente link --> ' + '\n' +
'saboresdecasma.com/form' + '\n' +
'Si logro realizar su pedido con exito, puede verlo en ' + '\n' + 
'saboresdecasma.com/pedidos'  + '\n' + 
'Gracias por su Preferencia'


validadorWsp.asignarRespuesta = function(objSolicitud){
    return new Promise ((resolve,reject)=>{

        if (objSolicitud.tipoIntencion == 'intSaludoWsp' || objSolicitud.tipoIntencion == 'intSaludoMsm'){
            objRespuesta.mensajeText().then(
                jsonRes=>{
                    jsonRes.text.text.push(msjBienvenida);
                //console.log(data);
                objRespuesta.fulfillmentMessages.push(jsonRes);
                //console.log(objRespuesta);
                resolve(objRespuesta);
            })

        }
   
        if (objSolicitud.tipoIntencion == 'intNivel1'){
            switch (objSolicitud.textoSolicitud){
                case '1':
                    objRespuesta.mensajeText().then(
                    data=>{
                    //console.log(data);
                    data.text.text.push(envioPdf);
                    //console.log(data);
                    objRespuesta.fulfillmentMessages.push(data);
                    //console.log(objRespuesta);
                    resolve(objRespuesta);
                    }
                    );
                    break;
                case '2':
                    objRespuesta.mensajeText().then(
                    data=>{
                    data.text.text.push(strRealizarPedido);
                    //console.log(data);
                    objRespuesta.fulfillmentMessages.push(data);
                    //console.log(objRespuesta);
                    resolve(objRespuesta);
                    })
                    break;
		/*
                case '3':
                    objRespuesta.mensajeText().then(
                    data=>{
                    data.text.text.push(strConsultaPedido);
                    //console.log(data);
                    objRespuesta.fulfillmentMessages.push(data);
                    //console.log(objRespuesta);
                    resolve(objRespuesta);
                    })
                    break;
		*/
            }
        }

        if (objSolicitud.tipoIntencion == 'intNivel2'){
            console.log(objSolicitud.valorParametro);
                dataAccessPedido.consultar(objSolicitud.valorParametro).then(
                    data => {
                        objRespuesta.mensajeText().then(
                            jsonRes=>{
                                jsonRes.text.text.push(data);
                                objRespuesta.fulfillmentMessages.push(jsonRes);
                                console.log(objRespuesta.fulfillmentMessages);
                                resolve(objRespuesta);
                        })
                })       
        }

    })
}

validadorWsp.limpiarObjetoRespuesta = function(objRespuesta){
    return new Promise((resolve,reject)=>{
        objRespuesta.fulfillmentText = '';
        objRespuesta.fulfillmentMessages = [];
    })
}

module.exports = validadorWsp;