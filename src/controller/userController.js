const userService = require('../service/userService');
const { validationResult } = require("express-validator");

async function userController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
   const data = await userService();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Error interno en /users :v' });
  }
}

module.exports = userController;