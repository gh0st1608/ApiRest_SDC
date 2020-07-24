

arrayOpcionesMenuPersistente = new Array(2);
arrayOpcionesCarta = new Array();
arrayOpcionesMenu = new Array();
arrayOpcionesTemplate = new Array();



var template_JSON = new Object();

function listarOpcionesMenuPersistente(){
  arrayOpcionesMenuPersistente[0] = 'E'; //indice 0
  arrayOpcionesMenuPersistente[1] = 'C'; //indice 1
  arrayOpcionesMenuPersistente[2] = 'M'; //indice 2
  arrayOpcionesMenuPersistente[3] = 'F'; //indice 3
}




function listarOpcionesCarta(){
  for(i=0;i<10;i++){
    arrayOpcionesCarta[0] = '1.- Chaufas';
  }
}

function listarOpcionesMenu(){
    arrayOpcionesMenu[0] = '1. Menu Clasico';
    arrayOpcionesMenu[1] = '2. Menu Ejecutivo';
    arrayOpcionesMenu[2] = '3. Menu Marino';
}

function listarElementosTemplate(){
  for(j=0;j<20;j++){
    arrayOpcionesTemplate[j] =  j+1;
  }
}

function listarBotonesxTemplate(){

}


listarOpcionesMenuPersistente();
listarOpcionesCarta();
listarOpcionesMenu();
listarElementosTemplate();

/*
function listarOpcionesMenu(){
  for(j=0;j<2;j++){
    arrayOpcionesMenu[i] = i+1;
  }
}

function obtenerListaTemplate (template_Json){
}





module.exports = arrayOpcionesMenuPersistente;

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
*/
module.exports.arrayOpcionesMenuPersistente = arrayOpcionesMenuPersistente;
module.exports.arrayOpcionesTemplate=arrayOpcionesTemplate;
//module.exports.arrayOpcionesMenu = arrayOpcionesMenu;