const express = require("express");
const router = express.Router();
const Contact = require("../models/contactSchema.js");
const jwt = require("jsonwebtoken");
const secret = "SECRET";

//POST CONTACT PER USER
router.post("/add", async (req, res) => {
  const { name, designation, company, industry, phoneNo, country } = req.body;
  jwt.verify(req.headers.token, secret, (err, user) => {
    if (err) console.log(err.message);
    req.user = user.data;
  });
  try {
    let data = await Contact.find({ userRef: req.user });
    if (data.length === 1) {
      data = await Contact.find({ userRef: req.user }).updateOne(
        {},
        {
          $push: {
            Contacts: {
              name,
              designation,
              company,
              industry,
              phoneNo,
              country,
            },
          },
        }
      );
    } else {
      data = await Contact.create({
        Contacts: { name, designation, company, industry, phoneNo, country },
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
  jwt.verify(req.headers.token, secret, (err, user) => {
    if (err) console.log(err.message);
    req.user = user.data;
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

// //GET AS PER SEARCH
// router.get("/search", async (req, res) => {
//   jwt.verify(req.headers.token, "SECRET", (err, user) => {
//     if (err) console.log(err.message);
//     req.user = user.data;
//   });
//   const search = req.query.name;
//   try {
//     let data = await Contact.find({ name: { $regex: search, $options: "i" } });
//     res.json(data);
//   } catch (e) {
//     res.json({ message: e.message });
//   }
// });
module.exports = router;
