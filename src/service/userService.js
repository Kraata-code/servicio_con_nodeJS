const users = require('../models/userModel');

async function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}

module.exports = getUsers;