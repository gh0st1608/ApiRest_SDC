class Template {

  constructor(title,subtitle,item_url,image_url,buttons){
    //this.templateID;
    this.title = title;
    this.subtitle = subtitle
    //this.categoria = categoria;
    //this.grupoproducto = grupoproducto;
    //this.subtitle = subtitle;
    this.item_url = item_url;
    this.image_url = image_url;
    this.buttons = buttons;
  }

}

module.exports = new Template();
  /*

  set templateID(newtemplateID) {
    this._templateID = newtemplateID;
  }/*

}



/*
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
*/



