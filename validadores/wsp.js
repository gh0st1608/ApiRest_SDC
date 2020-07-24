const objRespuesta = require('../model/resWebhook');
const dataAccessPedido = require('../dao/wsp.js');
validadorWsp = {};

var msjBienvenida = 'Gracias por comunicarte con SABORES DE CASMA.\n' +
'Escriba el numero de la opcion que necesite para poder atenderlo.\n' +
'1. Ver Carta\n' +
'2. Realizar Pedido\n' +
'3. Consultar Pedido\n' +
'Gracias por su preferencia'

envioPdf = 'En este link podra ver la carta oficial en pdf de sabores de casma ' + 'https://url2.cl/fdZ4B \n' +
'O si desea puede consultarlo de manera facil y sencilla dandole click a nuestros botones (carta - compartir) \n' +
'en nuestra inbox de facebook messenger --> m.me/1685945551714503' + '\n' +
'Gracias por su preferencia'

strRealizarPedido = 'Para poder registrar su pedido por favor necesitamos que llene los siguiente parametros\n' + 
'en el siguiente link --> ' + 'saboresdecasma.com/form' + '\n' +
'---------EJEMPLO-------------' + '\n' +
'EJEMPLO PRACTICO\n'+
'Nombre: User \n' +
'Fecha: 18/07/2020 13:00:00\n' +
'Hora: 21:00\n' +
'Producto: Arroz Chaufa\n' +
'Direccion: Jose Leyan 502\n' +
'----------------------------' + '\n' +
'Si logro realizar su pedido con exito escriba la palabra' + '\n' + 
'--> Listo <--' + '\n' + 
'Gracias por su Preferencia'

strConsultaPedido = 'Para poder consultar su pedido solo escriba\n' +
'Consulta <numCelular>\n' +
'------Ejemplo Practico--------\n' +
'Consulta 947393463\n' +
'...............................'

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