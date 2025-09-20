const users = require("../models/Modeluser");

async function getUsernameByEmail (email){
    // const user = users.findAll((u)=> u.email === email);
    // if(!user){
    //     throw new Error('Usuario no encontrado');
    // }
    // return{nombre: user.nombre};
    return "Hola mundo desde el servicio para obtener usuario";
};

module.exports = { getUsernameByEmail };