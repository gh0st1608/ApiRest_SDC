//const {promesaConexion,promesaFinConexion} = require('./conexion.js');
 const database = require('../model/coneccion.js');
 const db = {}; 


/*
var sqlTiposProductos = 'SELECT grupoproducto.nombre_grupo_producto FROM producto \
INNER JOIN categoria on categoria.idCategoria = producto.Categoria_id \
INNER JOIN grupoproducto on grupoproducto.idGrupoProducto = producto.GrupoProducto_id \
WHERE Categoria_id = ' + paramPostback + ' and idGrupoProducto >= 11';

var sqlTiposProductos = 'SELECT grupoproducto.nombre_grupo_producto FROM producto \
INNER JOIN categoria on categoria.idCategoria = producto.Categoria_id \
INNER JOIN grupoproducto on grupoproducto.idGrupoProducto = producto.GrupoProducto_id \
WHERE Categoria_id = ' + paramPostback + ' and idGrupoProducto >= 11';
*/


//var sqlTiposProductosMenu = 'SELECT nombre_grupo_producto FROM grupoproducto WHERE idGrupoProducto > 10';

var sqlTiposProductosCarta ='SELECT DISTINCT grupoproducto.idGrupoProducto, grupoproducto.nombre_grupo_producto FROM producto \
INNER JOIN categoria on categoria.idCategoria = producto.Categoria_id \
LEFT JOIN grupoproducto on grupoproducto.idGrupoProducto = producto.GrupoProducto_id \
WHERE Categoria_id = 1'

var sqlTiposProductosCompartir ='SELECT DISTINCT grupoproducto.idGrupoProducto, grupoproducto.nombre_grupo_producto FROM producto \
INNER JOIN categoria on categoria.idCategoria = producto.Categoria_id \
INNER JOIN grupoproducto on grupoproducto.idGrupoProducto = producto.GrupoProducto_id \
WHERE Categoria_id = 3'




db.queryTiposProductosCarta = function(){
  return new Promise((resolve,reject) =>{
      database.query(sqlTiposProductosCarta)
        .then( 
          data => {
            //console.log(data);
            resolve(data); 
          })
    })
  }

  db.queryTiposProductosCompartir = function(){
    return new Promise((resolve,reject) =>{
        database.query(sqlTiposProductosCompartir)
          .then( 
            data => {
              console.log(data);
              resolve(data); 
            })
      })
    }
 
db.queryListaImagenesProductos = function (idGrupoProducto,idCategoria){
var sqlListaImagenesProductos = 'SELECT Categoria_id,GrupoProducto_id,nombre_producto,imagen_producto FROM producto \
WHERE GrupoProducto_id = ' + idGrupoProducto + ' AND Categoria_id = ' + idCategoria + ' AND activo=1';
console.log(sqlListaImagenesProductos);
  return new Promise((resolve,reject) =>{
    database.query(sqlListaImagenesProductos)
    .then( 
      data => {
        console.log(data);
        resolve(data); 
      })
})
}



db.queryProductosMenu = function(tipoPlatoCarta){
  return new Promise((resolve,reject) =>{
    database.query(sqlListaPlatosCarta + tipoPlatoCarta)
    .then( 
      data => {
        console.log(data);
        resolve(data); 
      })
})
}




module.exports = db;
 
