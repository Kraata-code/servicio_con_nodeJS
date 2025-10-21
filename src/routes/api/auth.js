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
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                username:
 *                  type: string
 *                  description: usuario del nuevo usuario
 *                  example: "pepito123"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/", rules, validator, hashPassword, userController);
/**
 * @swagger
 * /api/user/username:
 *   post:
 *     summary: Obtiene el nombre de usuario usando un token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@ejemplo.com"
 *     responses:
 *       200:
 *         description: Nombre de usuario obtenido exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
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
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "juanperez"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Nombre de usuario o contraseña faltantes
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
  "/login",
  body("username").notEmpty().withMessage("Nombre de usuario es requerido"),
  body("password").notEmpty().withMessage("Contraseña es requerida"),
  validator,
  loginController
);
/**
 * @swagger
 * /api/user/test-secret:
 *   get:
 *     summary: Prueba la validez del token JWT contra SECRET_KEY
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: El token fue firmado con la SECRET_KEY correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El token fue firmado con la SECRET_KEY correcta"
 *                 decoded:
 *                   type: object
 *                   description: Información decodificada del token
 *       400:
 *         description: No se proporcionó token
 *       401:
 *         description: Token inválido o SECRET_KEY incorrecta
 */
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
