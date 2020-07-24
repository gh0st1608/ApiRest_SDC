const dbProducto = require('../db/producto.js'); // db


const daoBot = {};


daoBot.listarTipoProductos = function(idTipoProducto){
  var cadenaTipoProducto = '';
  var cadenaList = '\n';
  return new Promise((resolve, reject) => {
    switch (idTipoProducto){
        case 1:
          var cadenaMsg = 'Tenemos lo siguiente de Carta :';
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
          var cadenaMsg = 'Tenemos lo siguiente de Compartir Familiar :';
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
          resolve(result);
        })
})
}



module.exports = daoBot;








//let serialize = require('./serializer') // serializer custom to db







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
