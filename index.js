const express = require('express');
let app = express();
const port = 3000;
require('dotenv').config();
const routes = require('./src/routes/public')

app.use(express.json());
app.use('/users', routes);

app.listen(port, () => {
  console.log("servidor corriendo en el puerto " + port);
});