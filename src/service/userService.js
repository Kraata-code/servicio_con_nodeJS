const Modeluser = require('../models/Modeluser');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    try {
        console.log('Datos recibidos:', userData); 
        const newUser = await Modeluser.create({
           username: userData.username, 
            password: userData.password,
            email: userData.email
        });
        console.log('Usuario creado:', newUser.toJSON());
        return newUser;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

async function loginUser(username, password) {
    try {
        console.log('Datos recibidos para login:', { username, password });

        const user = await Modeluser.findOne({ where: { username } });
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        return user;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}

module.exports = { createUser, loginUser }