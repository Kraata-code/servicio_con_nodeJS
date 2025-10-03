// Ruta de prueba para comparar el token con SECRET_KEY
const jwt = require('jsonwebtoken');

const users = require("../../models/Modeluser");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validator = require("../../middleware/validator");
const { loginController } = require('../../controller/userController');
// const userController = require("../../controller/userController");
const {
  userController,
  getUsername,
  login,
} = require("../../controller/userController");
const verifyToken = require("../../middleware/token");
const hashPassword = require("../../middleware/bcrypt");
const rules = [
  body("email")
    .notEmpty()
    .withMessage("Campo vacio")
    .isLength({ max: 30 })
    .isEmail()
    .withMessage("El correo no es validso")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Campo vacio")
    .isString()
    .isLength({ min: 8, max: 15 })
    .withMessage("La contraseña debe contener 8 caracteres"),
];
require("dotenv").config();

router.post("/", rules, validator, hashPassword, userController);
router.post(
  "/username",
  body("email")
    .notEmpty()
    .withMessage("Campo vacio")
    .isEmail()
    .withMessage("El correo no es validso")
    .normalizeEmail(),
  validator,
  verifyToken,
  getUsername
);

router.post(
  "/login",
  body("username").notEmpty().withMessage("Nombre de usuario es requerido"),
  body("password").notEmpty().withMessage("Contraseña es requerida"),
  validator,
  loginController
);

router.get('/test-secret', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o SECRET_KEY incorrecta', error: err.message });
    }
    return res.json({ message: 'El token fue firmado con la SECRET_KEY correcta', decoded });
  });
});


module.exports = router;
