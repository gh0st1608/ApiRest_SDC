const express = require('express');
const path = require('path');
const morgan = require('morgan'); //registrar las peticiones antes de que lleguen
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const activarComp = require('./componentes/index.js');
const app = express();

//importar rutas
//Rutas Back(botwsp botfb)
const rutasBack = require('./routes/index.js');
//Rutas Front (web y crm)
const rutasFront = require('./routes/pedido.js');


// setings Poder configurar express
//almacenar en una variable port
app.set('port',config.PUERTO_NODE);

app.set('view engine','ejs');

// middlewares (ejecutar funciones antes de que lleguen las peticiones de los usuarios)
app.use(morgan('dev'));

app.use(bodyParser.json());

//validar la data del formulario
app.use(express.urlencoded({extended: false}));

app.use('/',rutasFront);

app.use('/',rutasBack);


//archivos estaticos
console.log(__dirname);
//app.use('/public',express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/public')));



app.listen(app.get('port'), () => {
console.log('server en el puerto 3000');
});



