const express = require("express");
<<<<<<< HEAD
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const login = require("./routes/login");
const register = require("./routes/register");

const PORT = 8080;
const app = express();
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://contactmanager:contactmanager@cluster0.jvlvlig.mongodb.net/Contact-Manager?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

app.use(express.json());
app.use(bodyParser.json());
app.use("/Contact", route);
app.use("/login", login);
app.use("/register", register);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Invalid Path",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}/`);
=======
require("dotenv").config();
const port =  8080;
const mongoose = require("mongoose");
const app = express();
const login = require("./routers/login");
const register = require("./routers/register")
const bodyParser=require('body-parser')

mongoose.connect("mongodb+srv://contactmanager:contactmanager@cluster0.jvlvlig.mongodb.net/Contact-Manager?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true },()=>console.log("DB is connected"))


app.use(bodyParser())
app.use("/login",login);
app.use("/register",register)



app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}/`);
>>>>>>> df902e338dccba6496926d21ad3dd6ad87f0c971
});
