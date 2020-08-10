const matrizPostback = require('../auxiliares/index.js');
const objMensaje = require('../model/mensaje.js');
const objTemplate = require ('../model/template.js');
const dataAccess = require('../dao/index.js');
const validadorBot = {};

validadorBot.completarObjetoMensaje = function(evento){
  console.log(evento);
  var tipoEvento = Object.keys(evento.entry[0].messaging[0])[3];
  objMensaje.tipoEvento = tipoEvento;
  evento.entry.forEach(function (objEntry){
    objMensaje.entryID = objEntry.id; 
          objEntry.messaging.forEach(function(objMessaging){
            objMensaje.entryID = objEntry.id;
            objMensaje.senderID = objMessaging.sender.id;
            objMensaje.recipientID = objMessaging.recipient.id;
              switch (tipoEvento){
                case 'message':
                  objMensaje.textoInicial = objMessaging.message.text
                  //objMensaje.tipoIntencion = 2;
                  //objMensaje.tipoRespuesta = 2;
                  break;
                case 'postback':
                  objMensaje.postTitle = objMessaging.postback.title;
                  objMensaje.postPayload = objMessaging.postback.payload;
                  //objMensaje.tipoIntencion = 1; // 1 intencion mostrar lista del mp - 2 intencion mostrar de objetos template - 3 intencion Conversar
                  //objMensaje.tipoRespuesta = 1; // 1 respuesta tipo texto - 2 mensaje tipo template
                  break;
              }
    })
  })
  return new Promise((resolve,reject)=>{
    resolve(objMensaje)
  })
}

validadorBot.limpiarObjetoMensaje = function(objMensaje){
  //var tipoEvento = Object.keys(evento.entry[0].messaging[0])[3];
    objMensaje.tipoEvento = '';
    objMensaje.entryID = '';
    objMensaje.senderID = '';
    objMensaje.recipientID = '';
    objMensaje.textoInicial = '';
    objMensaje.postTitle = '';
    //objMensaje.postPayload = '';
    objMensaje.tipoIntencion = '';
    objMensaje.tipoRespuesta = '';
  return new Promise((resolve,reject)=>{
    resolve(objMensaje)
  })
}

validadorBot.direccionarFlujo = function(objMensaje){
  console.log('entro a direccionar flujo');
    return new Promise((resolve,reject)=>{
      //console.log(objMensaje.postPayload);
      if (objMensaje.textoInicial === '' || typeof objMensaje.textoInicial === 'undefined'){
              console.log('postPayload esta vacio');
              objMensaje.tipoIntencion = 1; // intencion de mostrar la lista de carta,menu y pedido
              objMensaje.tipoRespuesta = 1; //texto simple 
              resolve(objMensaje);

        }else{
          console.log('textoInicial con data');
          var valorEncontrado = matrizPostback.arrayOpcionesTemplate.find(element => element == objMensaje.textoInicial);
          console.log(valorEncontrado);    
          if ( valorEncontrado >= 0){
            objMensaje.tipoIntencion = 2; //intencion de visualizar los templates
            objMensaje.tipoRespuesta = 2; //mensaje tipo template
            resolve(objMensaje);
          }
          if (typeof valorEncontrado === 'undefined' ){
            objMensaje.tipoIntencion = 3; //intencion de conversar
            objMensaje.tipoRespuesta = 1; //mensaje tipo texto
            resolve(objMensaje);
          }
      }
  })
}   


validadorBot.obtenerIdPostback = function(objMensaje){
  idPostback = matrizPostback.arrayOpcionesMenuPersistente.findIndex( pb => pb === objMensaje.postPayload ); //Si es C =  1 M = 2
  objMensaje.postPayload = idPostback;
  //console.log(idPostback); //1 o 2 o 3
  return new Promise ((resolve,reject) => {
    resolve(objMensaje);
    reject('no encontro idPostback');
  })
}


validadorBot.obtenerTiposProductoMP= function(objMensajeMod){
  mensajeRespuesta = '';
  console.log(objMensajeMod.postPayload);
  return new Promise((resolve,reject) => {
  switch (objMensajeMod.postPayload){
    case 0:
      mensajeRespuesta = 'Buenas tardes estimado cliente,'+ '\n' + 'haga click en el ' + '\n' + 'link de abajo' + '\n' + 'https://cutt.ly/fdNGxOG' + '\n' + ' para poder atenderlo por whatsapp.' + '\n' + 'Gracias por su preferencia' ;
      resolve(mensajeRespuesta);
      break;

    case 1:
      console.log('entro opcion 1');
      //carta
      dataAccess.listarTipoProductos(objMensajeMod.postPayload).then(mensajeRespuesta=>{
        console.log('------');
        //console.log(mensajeRespuesta);
        resolve(mensajeRespuesta);
        console.log('-----');
      });
      break;

    case 3:
      //menu
      dataAccess.listarTipoProductos(objMensajeMod.postPayload).then(mensajeRespuesta=>{
        console.log('------');
        //console.log(mensajeRespuesta);
        resolve(mensajeRespuesta);
        console.log('-----');
      });
      break;
  }
    })
}



/*
--Lista productos Solo texto--
validadorBot.obtenerProductos = function(idTipoPlato){
  mensajeRespuesta = '';
  if(idTipoPlato.length = 1){
  return new Promise ((resolve,reject) => {
    dataAccess.listarProductosCarta(idTipoPlato).then(mensajeRespuesta=>{
      console.log('------');
      //console.log(mensajeRespuesta);
      resolve(mensajeRespuesta);
      console.log('-----');
     });      
    })
  }
}
*/
validadorBot.obtenerTipoRespuesta = function(objMensajeFiltrado){
  console.log('entro a obtener tipo respuesta');
  mensajeRespuesta = '';
  return new Promise ((resolve,reject) => {
    switch (objMensajeFiltrado.tipoIntencion){
      /*case 1:
        console.log('intencion opcion 1');
        break;
      */
      case 2: //escribio una opcion de la lista de los tipos de productos
        console.log('intencion tipo 2');
        dataAccess.listarInfoTemplateTipoPlato(objMensajeFiltrado).then(dataTemplate=>{
          //console.log('------');
          //console.log(dataTemplate);
          var arrayObjetosTemplate = [];
            Object.keys(dataTemplate).forEach(function(key){
            //for(l = 0; l<dataTemplate.length; l++){
            var objTemplateElemento = new objTemplate.constructor();
            objTemplateElemento.title = dataTemplate[key].nombre_producto;
            objTemplateElemento.subtitle = dataTemplate[key].grupo_producto;
            //objTemplateElemento.item_url = dataTemplate[key].imagen_producto;
            objTemplateElemento.image_url = dataTemplate[key].imagen_producto;
            //objTemplateElemento.categoria = dataTemplate[key].Categoria_id;
            //objTemplateElemento.grupoproducto = dataTemplate[key].GrupoProducto_id;
            arrayObjetosTemplate.push(objTemplateElemento);
           })
            resolve(arrayObjetosTemplate);  
         });
         break;
      case 3: //escribio cualquier cosa menos las opciones
      //https://cutt.ly/fdNGxOG
          mensajeRespuesta = 'Buenas tardes estimado cliente,'+ '\n' + 'haga click en el ' + '\n' + 'link de abajo' + '\n' + 'https://cutt.ly/fdNGxOG' + '\n' + ' para poder atenderlo por whatsapp.' + '\n' + 'Gracias por su preferencia' ;
          console.log('intencion tipo 3');
          resolve(mensajeRespuesta); 
          break;
    }     
    }) 
}



/*
formato plantilla template
"payload": {
  "template_type":"generic",
  "elements":[
     {
      "title":"<TITLE_TEXT>",
      "image_url":"<IMAGE_URL_TO_DISPLAY>",
      "subtitle":"<SUBTITLE_TEXT>",
      "default_action": {
        "type": "web_url",
        "url": "<DEFAULT_URL_TO_OPEN>",
        "messenger_extensions": <TRUE | FALSE>,
        "webview_height_ratio": "<COMPACT | TALL | FULL>"
      },
      "buttons":[<BUTTON_OBJECT>, ...]      
    },
    ...
  ]
}

Ejemplo

"recipient":{
    "id":"<PSID>"
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "messenger_extensions": false,
              "webview_height_ratio": "tall",
              "fallback_url": "https://petersfancybrownhats.com/"
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
      }
    }
  }
}


*/

validadorBot.obtenerMensajeFinal = function(senderID,mensajeRespuesta,tipoRespuesta){
  console.log('entro a obtener mensaje final');
  console.log(senderID);
  console.log(tipoRespuesta);
  return new Promise((resolve,reject) => {
    switch (tipoRespuesta){
      case 1:
        var mensajeFinal = {
          recipient: {
            id: senderID,
          },
          message: {
            text: mensajeRespuesta,
          },
        };
        resolve(mensajeFinal);
        break;

      case 2:
        var mensajeFinal = {
              recipient : {
                id: senderID
              },
              message: {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "generic",
                    elements: mensajeRespuesta
              }
            }
          }
        };
        resolve(mensajeFinal);
        break;
      }
    }) 
}
/*
validadorBot.enviarMensajeTemplate = (recipientId) => {
  var messageData = {
      recipient : {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [elementTemplate()]
          }
        }
      }
  };
  return messageData;
}
*/

  //console.log(dataAccess.listarProductosMenu()); //dao


module.exports = validadorBot; // or whatever you want to assign it to



/*
function elementTemplate(){
return {
  title : "Pedido",
  subtitle: "Delivery",
  item_url : "www.saboresdecasma.com",
  image_url : "https://cutt.ly/Cygf897",
  buttons: [buttonTemplate()],
}
}

function buttonTemplate(){
return {
  type: "web_url",
  url: "https://saboresdecasma.com",
  title: "Seleccionar Platillos"
}
}


*/

