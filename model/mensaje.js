
class Mensaje {

  constructor(entryID,recipientID,tipoEvento,postTitle,postPayload,senderID,textoInicial,tipoIntencion,tipoRespuesta){
    this.entryID = entryID;
    this.recipientID = recipientID;
    this.tipoEvento = tipoEvento;
    this.postTitle = postTitle;
    this.postPayload = postPayload;
    this.senderID = senderID;
    this.textoInicial = textoInicial;
    this.tipoIntencion = tipoIntencion;
    this.tipoRespuesta = tipoRespuesta;
  }

  get senderID() {
    return this._senderID;
  }
  
  set senderID(newSenderID) {
    this._senderID = newSenderID;
  }

  get respuestaTexto() {
    return this._senderID;
  }
  
  set respuestaTexto(newRespuestaTexto) {
    this._respuestaTexto = newRespuestaTexto;
  }


}

module.exports = new Mensaje();


