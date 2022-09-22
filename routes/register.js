const express = require("express");
const data = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();
require("dotenv").config();

router.use(express.json());

router.post(
  "/",
  body("password"),
  body("confirm_password"),
  body("email").isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "Failed By Validator",
          message: errors.array(),
        });
      } else {
        const { password, confirm_password } = req.body;
        if (password != confirm_password)
          return res.status(400).json({ message: "Password doesnot match" });

        const salt = await bcrypt.genSalt(12);
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          await data.create({
            email: req.body.email,
            password: hash,
          });
        });
        res.status(200).json({
          status: "Success",
          message: "Please Login",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  }
);

module.exports = router;
