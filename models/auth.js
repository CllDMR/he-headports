const mongoose = require("mongoose");

var AuthSchema = new mongoose.Schema({
  UID: {
    type: String,
    required: true
  },
  accountType: {
    type: Number,
    required: true
  }
});

var Auth = mongoose.model("Auth", AuthSchema);

module.exports = { Auth };
