const dbPedido = require('../db/pedido.js');
const objPedidoController = {};


objPedidoController.mostrarFormulario = (req, res) => {
    const data1 = req.body;
    console.log(data1);
    res.render('guardarPedido');
}

objPedidoController.guardarPedido = (req, res) => {
    var data = req.body;
    //console.log(data);
    console.log('entro a guardar');
    console.log(data);
    dbPedido.guardarPedidoWsp(data.nombre,data.fecha + ' ' + data.hora,data.telefono,data.productos,data.direccion)
    res.sendStatus(200);
}

objPedidoController.listarPedido = (req,res) => {
    const data1 = req.body;
    dbPedido.listarPedidoWsp()
    .then(pedidos => {
        console.log(pedidos);
        res.render('listarPedido', {
            data: pedidos
         });
    })  
}

module.exports = objPedidoController;