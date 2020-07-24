class SolicitudWebhook {

    constructor(textoSolicitud,tipoIntencion,tipoRespuesta,tipoParametro,valorParametro){
      //this.tipoEvento = tipoEvento;
      this.textoSolicitud = textoSolicitud;
      this.tipoIntencion = tipoIntencion;
      this.tipoRespuesta = tipoRespuesta;
      this.tipoParametro = tipoParametro;
      this.valorParametro = valorParametro;
    }



  }
  
  module.exports = new SolicitudWebhook();