const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");
const Users = require("../data/users-model.js");

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      userRole: "student"
    },
    secrets.jwt,
    { expiresIn: "1h" }
  );
}

router.post("register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({
        message: `welcome ${saved.username}`,
        authToken: token
      });
    })
    .catch(err => {
      res.status(500).json(error);
    });
});

module.exports = router;
