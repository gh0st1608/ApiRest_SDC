const dbPedido = require('../db/pedido.js'); // db
const daoWsp = {};

daoWsp.consultar = function (parametro) {

    return new Promise ((resolve,reject)=> {
    dbPedido.consultarPedidoWsp(parametro)
    .then(pedidoConsultado => {
    console.log('------daoWsP-------');
    Object.keys(pedidoConsultado).forEach(function(key){
        cad1 = 'Titular: ' + pedidoConsultado[key].titular_pedido;
        cad2 = 'Fecha de Entrega: ' + pedidoConsultado[key].fecha_entrega;
        cad3 = 'Productos:' + pedidoConsultado[key].productos;
        cad4 = 'Direccion: ' + pedidoConsultado[key].direccion;
      })
    cadFinal = cad1 + '\n' + cad2 + '\n' + cad3 + '\n' + cad4
    //console.log(cadFinal);
    resolve(cadFinal)
    }
    )

    })
}



module.exports = daoWsp;