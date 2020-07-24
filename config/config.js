require('dotenv').config({
    path:'.env'
});


module.exports = {
PUERTO_NODE:process.env.APP_PORT,
TOKEN_FB: process.env.TOKEN_FB,
MYSQL_BD : {
    HOST_BD:process.env.BD_HOST,
    USER_BD:process.env.BD_USER,
    PASS_BD:process.env.BD_PASS,
    PORT_BD:process.env.BD_PORT,
    NAME_BD:process.env.BD_DATABASE,
}
}