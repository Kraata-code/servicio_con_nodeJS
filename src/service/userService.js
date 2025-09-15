const users = require('../models/Modeluser');

async function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}

module.exports = getUsers;