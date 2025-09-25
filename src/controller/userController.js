const userService = require('../service/userService');
const { validationResult } = require("express-validator");
const { getUsernameByEmail} = require('../service/userNameService')

async function userController(req, res) {
  try {
   const data = await userService();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Error interno en /users :v' });
  }
}

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
module.exports = { userController, getUsername };