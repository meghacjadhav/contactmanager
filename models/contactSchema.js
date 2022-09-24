const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  Contacts: [
    {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      email: { type: String, required: true },
      company: { type: String, required: true },
      industry: { type: String, required: true },
      phoneNo: { type: Number, required: true },
      country: { type: String, required: true },
    },
  ],

  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Contact = mongoose.model("contacts", ContactSchema);

module.exports = Contact;
