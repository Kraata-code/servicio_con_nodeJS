const express = require("express");
let app = express();
const port = 3000;
require("dotenv").config();
const routes = require("./src/routes/api/auth");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(morgan("dev"));    
app.use(helmet());          
app.use(express.json());   
app.use("/users", routes);

app.listen(port, () => {
  console.log("servidor corriendo en el puerto " + port);
});