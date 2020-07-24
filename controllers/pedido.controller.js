const dbPedido = require('../db/pedido.js');
const objPedidoController = {};


objPedidoController.mostrar = (req, res) => {
    const data1 = req.body;
    console.log(data1);
    res.render('pedido');
}

objPedidoController.guardar = (req, res) => {
    var data = req.body;
    //console.log(data);
    console.log('entro a guardar');
    console.log(data);
    dbPedido.guardarPedidoWsp(data.nombre,data.fecha + ' ' + data.hora,data.telefono,data.productos,data.direccion)
    res.sendStatus(200);
}

module.exports = objPedidoController;