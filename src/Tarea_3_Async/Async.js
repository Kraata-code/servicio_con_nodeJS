const user = [
  { username: "Jorge Natanael", age: 30, password: "12345" },
  { username: "Lucía Romero", age: 25, password: "lucia25" },
  { username: "Carlos Méndez", age: 40, password: "c4rl0s!" },
  { username: "Ana María", age: 19, password: "ana19pass" },
  { username: "Pedro Ruiz", age: 33, password: "pedro333" },
  { username: "Valentina Cruz", age: 28, password: "valen_pass" },
  { username: "Marcos López", age: 22, password: "mlopez22" },
  { username: "Isabel Torres", age: 35, password: "torres123" },
  { username: "Samuel García", age: 27, password: "s4muEL!" },
  { username: "Daniela Silva", age: 31, password: "daniSilva31" },
];

var express = require("express");
var app = express();
const port = 3000;

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 2000);
  });
}

app.get("/data", async function (req, res) {
  const data = await getUser();
  res.send(data);
});
app.listen(port, () => {
  console.log("servidor corriendo en el puerto " + port);
});