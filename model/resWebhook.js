class RespuestaWebhook {
        fulfillmentText = '';
        fulfillmentMessages = [];
        
        mensajeText(){
          return new Promise((resolve,reject)=>{
            var jsonTextoSimple = {
              text: {
                text : []
              }
            };
          resolve(jsonTextoSimple);
          })

        }
        mensajeImage(url,texto){
          return new Promise((resolve,reject)=>{
            var jsonImagen = {
              imageUri : url,
              accessibilityText : texto
            }
          resolve(jsonImagen)
          })
 
        }
    
    /*mensajeImage(imageUri, accessibilityText){
      this.image = {
        imageUri : imageUri,
        accessibilityText : accessibilityText
      }
    }
    */
  
  }
  
  module.exports = new RespuestaWebhook();