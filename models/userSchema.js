<<<<<<< HEAD
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
=======
const mongoose = require ("mongoose");

const UserSchema = mongoose.Schema({
    email:{type:String , require:true},
    password:{type:String , require:true}

})

const User = mongoose.model("users", UserSchema)

module.exports = User
>>>>>>> df902e338dccba6496926d21ad3dd6ad87f0c971
