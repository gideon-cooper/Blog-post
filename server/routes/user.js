const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/../.env") });
const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log(req.body.password);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    console.log(user);
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user created",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: "failed",
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1hr" }
      );
      res.status(200).json({
        token,
        expiredIn: 3600,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
