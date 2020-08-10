
const request = require('request');
const config = require('../config/config.js');

// https://api.whatsapp.com/send?phone=+{{ *YOURNUMBER* }}&text=%20{{ *YOUR MESSAGE* }}

var yourNumber = "+56998725080"
var yourMessage = "Mucho gusto Sabores de Casma, Deseo un pedido"

// %20 mean space in link
// If you already had an array then you just join them with '%20'
// easy right

/*function getLinkWhastapp(number, message) {
  number = yourNumber
  message = yourMessage.split(' ').join('%20')

  return console.log('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message)
}*/

console.log('entro');
function getLinkWhastapp(number, message) {
  var url = 'https://api.whatsapp.com/send?phone=' 
     + number 
     + '&text=' 
     + encodeURIComponent(message)

  return url
}


//console.log(urlWSP);

var getStarted_JSON = {
    "get_started":{
      "payload":"E"
    }
}



var persistentMenu_JSON = {
  //"psid": "3759961577378312",
  "persistent_menu": [
      {
          "locale": "default",
          "composer_input_disabled": false,
          "call_to_actions": [
              {
                "type": "web_url",
                "title": "📞 Pedido Whatsapp",
                "url": getLinkWhastapp(yourNumber,yourMessage),
                "webview_height_ratio": "full"
              },
              {
                "type": "postback",
                "title": "🍲 Carta",
                "payload": "C"
              },
              {
                "type": "postback",
                "title": "👨‍👩‍👦 Compartir",
                "payload": "F"
              }
          ]
      }
  ]
}

/*

curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"<PSID>"
  },
  "message":{
    "attachment": {
      "type": "template",
      "payload": {
         "template_type": "media",
         "elements": [
            {
               "media_type": "<image|video>",
               "url": "<FACEBOOK_URL>"
            }
         ]
      }
    }    
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"

*/


//boton empezar
request({
  url: "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=" + config.TOKEN_FB,
  method: "POST",
  json: true,   // <--Very important!!!
  body: getStarted_JSON
}, function (error, response, body){
  //console.log(response);
});
    


//menu persistente NIVEL DE PAGINA
request({
       url: "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=" + config.TOKEN_FB,
       method: "POST",
       json: true,   // <--Very important!!!
       body: persistentMenu_JSON
}, function (error, response, body){
       //console.log(response);
       console.log(body);
});


//--menu persistente NIVEL USUARIO--
//https://graph.facebook.com/v8.0/me/custom_user_settings?psid=<PSID>&params=[%22persistent_menu%22]&access_token=<PAGE_ACCESS_TOKEN>
/*
request({
  url: "https://graph.facebook.com/v8.0/me/custom_user_settings?psid=2832460436870442&params=[%22persistent_menu%22]&access_token=" + config.TOKEN_FB,
  method: "DELETE",
  json: true,   // <--Very important!!!
  body: persistentMenu_JSON
}, function (error, response, body){
  //console.log(response);
  console.log(body);
});
*/

//3759961577378312 psid sdc
//2832460436870442 psid erik

