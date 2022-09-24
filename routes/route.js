const express = require("express");
const router = express.Router();
const Contact = require("../models/contactSchema.js");
const jwt = require("jsonwebtoken");
const secret = "SECRET";

//POST CONTACT PER USER
router.post("/add", async (req, res) => {
  jwt.verify(req.headers.token, secret, (err, user) => {
    if (err) console.log(err.message);
    req.user = user.data;
  });
  try {
    let data = await Contact.find({ userRef: req.user });
    if (data.length > 1) {
      data = await Contact.find({ userRef: req.user }).updateOne(
        {},
        {
          $push: {
            Contacts: req.body,
          },
        }
      );
    } else {
      data = await Contact.create({
        Contacts: req.body,
        userRef: req.user,
      });
    }
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

//Get ALL CONTACT DATA PER USER
router.get("/get", async (req, res) => {
  if (req.headers.token !== null) {
    jwt.verify(req.headers.token, secret, (err, user) => {
      if (err) console.log(err.message);
      else req.user = user.data;
    });
    try {
      const data = await Contact.find({ userRef: req.user });
      res.status(200).json({
        status: "Sucess",
        message: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  } else {
    res.status(500).json({
      status: "Failed",
      message: "Please Refresh the Page",
    });
  }
});

//DELETE CONTACT PER USER
router.delete("/delete/:id", async (req, res) => {
  jwt.verify(req.headers.token, "SECRET", (err, user) => {
    if (err) console.log(err.message);
    req.user = user.data;
  });
  try {
    let data = await Contact.updateOne(
      { userRef: req.user },
      { $pull: { Contacts: { _id: req.params.id } } }
    );
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Delete Failed",
      message: error.message,
    });
  }
});

module.exports = router;
