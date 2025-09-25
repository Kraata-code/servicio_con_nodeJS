const User = require("../models/ModeloTest");

async function getUsernameByEmail(email) {
    try {
        const user = await User.findOne({
            where: { email: email },
            attributes: ['username', 'email'] 
        });
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al buscar el usuario: ' + error.message);
    }
}

module.exports = { getUsernameByEmail };