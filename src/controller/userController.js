const userService = require('../service/userService');

async function userController(req, res) {
  try {
   const data = await userService();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Error interno en /users :v' });
  }
}

module.exports = userController;