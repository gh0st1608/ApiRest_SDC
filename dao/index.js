const dbProducto = require('../db/producto.js'); // db
//const mensajeFinal = require('../model/mensajeFinal.js');
//const objMensajeFinal = require('../model/mensajeFinal.js'); //model
//const db = require('../db/producto.js');



const daoBot = {};


daoBot.listarTipoProductos = function(idTipoProducto){
  var cadenaTipoProducto = '';
  var cadenaList = '\n';
  return new Promise((resolve, reject) => {
    switch (idTipoProducto){
        case 1:
          var cadenaMsg = 'Escriba el número de opción para poder ver los platos de carta:';
          dbProducto.queryTiposProductosCarta().then(
            result => {
              Object.keys(result).forEach(function(key){
                cadenaList = cadenaList + result[key].idGrupoProducto + '.-' + result[key].nombre_grupo_producto + '\n'
              })
              cadenaMsg = cadenaMsg + cadenaTipoProducto + cadenaList;
              resolve(cadenaMsg);
        })
        break;

        case 3: 
          var cadenaMsg = 'Escriba el número de opción para poder ver los platos de Compartir Familiar :';
          dbProducto.queryTiposProductosCompartir().then(
            result => {
              Object.keys(result).forEach(function(key){
                cadenaList = cadenaList + result[key].idGrupoProducto + '.-' + result[key].nombre_grupo_producto + '\n'
              })
              cadenaMsg = cadenaMsg + cadenaTipoProducto + cadenaList;
              console.log(cadenaMsg);
              resolve(cadenaMsg);
      })

        break;
    }
  })
}

daoBot.listarInfoTemplateTipoPlato = function(objMensaje){
  return new Promise((resolve, reject) => {
    console.log(objMensaje.textoInicial);
    console.log(objMensaje.postPayload);
    dbProducto.queryListaImagenesProductos(objMensaje.textoInicial,objMensaje.postPayload).then(
      result => {
          console.log('-------dao-------')
          console.log(result);
          console.log('----------------')
        //Object.keys(result).forEach(function(key){
          resolve(result);
        })
        //resolve(result);  
})
}

module.exports = daoBot;
/*
daoBot.listarProductosCarta = function(param1){
  var cadenaMsg = '';
  var tipoPlato = '';
  var cadenaList = '\n';
  return new Promise((resolve, reject) => {
    dbProducto.promesaProductosCarta(param1).then(
      result => {
        Object.keys(result).forEach(function(key){
          tipoPlato = result[key].nombre_grupo_producto;
          cadenaList = cadenaList + String(parseInt(key) + 1) + '.-' + result[key].nombre_producto + '\n'
        })
        cadenaMsg = 'Nuestro repertorio de ' + tipoPlato + ' es el siguiente: \n';
        cadenaMsg = cadenaMsg + cadenaList;
        resolve(cadenaMsg);
  })  
})
}
*/




/*


daoBot.listarTipoProductosCarta = function(senderID){
  console.log('entro a listar TipoProductoCarta');
  mensajeRespuesta = 'Tenemos las siguientes tipos de platos Carta \n';
  
  dbProducto.promesaGrupoProducto2().then(
    //{ nombre_grupo_producto: 'Tiraditos' }
    function(result){
      mensajeFinal.respuestaTexto = result[1].nombre_grupo_producto;
      //console.log(objMensajeFinal.respuestaTexto);
      //console.log('-------------');
    }
    

    
        //i=0;
        //Object.keys(result).forEach(function(key){
        //console.log(result[i].nombre_grupo_producto);
        //var grupoproducto = result[1].nombre_grupo_producto;
        //mensaje.mensajeTexto = mensajeRespuesta;
        //i = i + 1;
        //console.log(grupoproducto);
        
        //})
        //console.log(grupoproducto);
        //Object.keys(result);   ---> ['0',  '1',  '2',  '3','4',  '5',  '6',  '7','8',  '9',  '10', '11','12', '13']
  )

  mensajeFinal.senderID = senderID;
}

*/




//let serialize = require('./serializer') // serializer custom to db

//console.log(dbProducto.rowsProducto);
/*
const daoBot = {};
daoBot.listarProductosMenu = function(){
  console.log('entro al dao');
  console.log(dbProducto.promesa1());
  //return Promise.resolve();
}
  */



//console.log(dbProducto.promesa1());






/*
let findStudent = (prop, val) => {
  if (prop === 'id') { prop = 'serial' }
  let student = STUDENTS.find(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}

let findStudentsBy = (prop, val) => {
  let student = STUDENTS.filter(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}


let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    serial: STUDENTS.length + 1,
    year: student.getGrade(),
    name: student.getName(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  STUDENTS.push(newStudent)
  return findStudent('serial', newStudent.serial)
}

let deleteStudent = (id) => {
  return findStudent({id})
    .then(student => {
      if (student.id == id) {
        STUDENTS = STUDENTS.filter(student => student.serial != id)
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
}
*/
//module.exports = daoBot;
