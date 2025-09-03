const express = require('express');
let app = express();
const port = 3000;
const userRoutes = require('./src/routes/userRoutes');


app.use('/users', userRoutes);

app.listen(port, () => {
  console.log("servidor corriendo en el puerto " + port);
});