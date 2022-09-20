const mongoose = require ("mongoose");

const ContactSchema = mongoose.Schema({
     Contacts :[{
             
        name:{type:String , require:true},
        designation:{type:String , require:true},
        company:{type:String , require:true},
        industry:{type:String , require:true},
        phoneNo:{type:Number , require:true},
        country:{type:String , require:true}
    }],
    userRef:{type:hg , require:true} //mongoose-id
    // userRef:"pooja@gmail.com"
})

const Contact = mongoose.model("contacts", ContactSchema)

module.exports = Contact

