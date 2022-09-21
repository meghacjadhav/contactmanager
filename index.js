const express = require("express");
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
});
