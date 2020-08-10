const database = require('../model/coneccion.js');
const db = {}; 

var sqlInsertarPedido ='INSERT INTO pedido (titular_pedido,fecha_entrega,telefono,productos,direccion)';

var sqlConsultarPedido = 'SELECT titular_pedido,fecha_entrega,productos,direccion FROM pedido WHERE telefono = ';

var sqlListarPedido = 'SELECT idPedido,titular_pedido,fecha_entrega,productos FROM pedido'



db.guardarPedidoWsp = function(nombre,fechaEntrega,telefono,productos,direccion){
  sqlInsertarPedidoWsp = sqlInsertarPedido + ' VALUES("' + nombre + '","' + fechaEntrega + '","' + telefono + '","' + productos + '","' + direccion + '")'
  console.log(sqlInsertarPedidoWsp);
  return new Promise((resolve,reject) =>{
      database.query(sqlInsertarPedidoWsp)
        .then( 
          data => {
            console.log(data);
            resolve(data); 
          })
    })
}

db.consultarPedidoWsp = function(telefono){
  //console.log('entro al db pedido');
  sqlConsultarPedido = sqlConsultarPedido + telefono
  //console.log(sqlConsultarPedido);
  return new Promise((resolve,reject) =>{
      database.query(sqlConsultarPedido)
        .then( 
          data => {
            //console.log(data);
            resolve(data); 
          })
    })
}

db.listarPedidoWsp = function(){
  return new Promise((resolve,reject) =>{
  database.query(sqlListarPedido)
        .then( data => {
          console.log(data);
            resolve(data); 
          })
        })
}

module.exports = db