const users = require('../models/Modeluser');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/test', async (req, res) => {
    try {
        const foundUsers = users.filter(user => user.password === req.query.password);

        if (foundUsers.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios' });
        }

        res.status(200).json(foundUsers); 
    } catch (err) {
        res.status(500).json({ error: 'Error interno en /test' });
    }
});

module.exports = router;