const users = require('../models/Modeluser');

async function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // resolve(users);
       resolve('Hola mundo desde el servicio');
    }, 2000);
  });
}

module.exports = getUsers;