const users = require('../models/userModel');
const product = { name: 'PC master race', price: 30000, weight: '20kg' }
const http = require('http');
const port = 3000
const { Sequelize } = require('sequelize');
require('dotenv').config();

const server = http.createServer((req, res) => {
    try {
        if (req.url === '/user' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } else if (req.url === '/product' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        } else if (req.url === '/error' && req.method === 'GET') {
            throw new Error('Error simulado en el servidor');
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }
    } catch (e) {
        console.error('500 Internal Server Error:', e.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '500 - Internal Server Error' }));
    }
}
)

const sequelize = new Sequelize(process.env.BD,process.env.USER,process.env.PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

sequelize.sync()
    .then(() => console.log("DB is ready"))
    .catch(err => console.error("Error al sincronizar la base de datos:", err));
server.listen(port, () => {
    console.log('servidor corriendo en el puerto ' + port)
})