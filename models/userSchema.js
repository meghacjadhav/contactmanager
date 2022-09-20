const mongoose = require ("mongoose");

const UserSchema = mongoose.Schema({
    email:{type:String , require:true},
    password:{type:String , require:true}

})

const User = mongoose.model("users", UserSchema)

module.exports = User