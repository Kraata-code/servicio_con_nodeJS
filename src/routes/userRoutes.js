const express = require('express');
const router = express.Router();
const users = require('../models/userModel');

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}

router.get("/", async function (req, res) {
  const data = await getUser();
  res.send(data);
});

module.exports = router;