const users = require("../../models/Modeluser");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// const userController = require("../../controller/userController");
const { userController, getUsername } = require("../../controller/userController");
const rules = [
  body("email")
    .notEmpty()
    .withMessage("Campo vacio")
    .isEmail()
    .withMessage("El correo no es validso")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Campo vacio")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener 8 caracteres"),
];
require("dotenv").config();

// router.get("/test", rules, async (req, res) => {
//   try {
//     const foundUsers = users.filter(
//       (user) => user.password === req.query.password
//     );

//     if (foundUsers.length === 0) {
//       return res.status(404).json({ error: "No se encontraron usuarios" });
//     }

//     res.status(200).json(foundUsers);
//   } catch (err) {
//     res.status(500).json({ error: "Error interno en /test" });
//   }
// });

router.post("/", rules, userController);
router.post("/username", rules,getUsername);

module.exports = router;