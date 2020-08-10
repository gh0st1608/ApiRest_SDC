class SolicitudWebhook {

    constructor(textoSolicitud,tipoIntencion,tipoRespuesta){
      //this.tipoEvento = tipoEvento;
      this.textoSolicitud = textoSolicitud;
      this.tipoIntencion = tipoIntencion;
      this.tipoRespuesta = tipoRespuesta;
    }

  }
  
  module.exports = new SolicitudWebhook();