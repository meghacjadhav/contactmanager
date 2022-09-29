// const express = require("express");
// const bcrypt = require("bcrypt");
// const router = express.Router();
// const user = require("../models/userSchema");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const secret = "SECRET";

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// router.post("/", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const userData = await user.find({ email: email });
//   console.log(req.body.email);
//   console.log("gurudeepnaik1234@gmail.com");
//   console.log(userData);

//   if (userData.length != 0) {
//     var result = await bcrypt.compare(password, userData.password);
//     if (result) {
//       const token = jwt.sign(
//         {
//           exp: Math.floor(Date.now() / 10) + 60 * 60,
//           data: userData._id,
//         },
//         secret
//       );
//       res.status(200).json({
//         Status: "Successful",
//         token: token,
//       });
//     } else {
//       res.status(400).json({
//         status: "failed",
//         message: "Wrong Password",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: "failed",
//       message: "No user Found",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = "SECRET";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userData = await user.findOne({ email: email });
  if (userData != null) {
    var result = await bcrypt.compare(password, userData.password);
    if (result) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 10) + 60 * 60,
          data: userData._id,
        },
        secret
      );
      res.status(200).json({
        Status: "Successful",
        token: token,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Wrong Password",
      });
    }
  } else {
    res.status(400).json({
      status: "failed",
      message: "No user Found",
    });
  }
});

module.exports = router;
