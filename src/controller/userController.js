const userService = require('../service/userService');
const { validationResult } = require("express-validator");
const { getUsernameByEmail } = require('../service/userNameService')
const { generateToken } = require('../middleware/generar_token')
const { createUser, loginUser } = require('../service/userService');

async function userController(req, res) {
  try {
    const userData = req.body;
    const newUser = await userService(userData);

    const token = generateToken({ id: newUser.id });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno en /users :v' });
  }
}

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await loginUser(username, password);

    const token = generateToken({ id: user.id });

    res.status(200).json({
      message: 'Login exitoso',
      user: { id: user.id, username: user.username },
      token,
    });

  } catch (error) {
    console.error('Error en login:', error);
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'Contraseña incorrecta') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error interno en login' });
  }
};

async function getUsername(req, res) {
  try {
    const { email } = req.body;
    const nombre = await getUsernameByEmail(email);
    res.status(200).json(nombre);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// module.exports = userController,{getUsername};
module.exports = { userController, getUsername, loginController }; // ✅ loginController sí está definido