var mongoose = require("mongoose");

var PersonalInfoSchema = new mongoose.Schema({
  candidateAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CandidateAccount"
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  educationLevel: {
    type: String
  }
});

var PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);

module.exports = { PersonalInfoSchema, PersonalInfo };
