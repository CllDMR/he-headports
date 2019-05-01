var mongoose = require("mongoose");

var ExperienceSchema = new mongoose.Schema({
  candidateAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CandidateAccount"
  },
  companyName: {
    type: String,
    required: true
  },
  positionName: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  finishDate: {
    type: Date,
    required: false
  },
  workStyle: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

var Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = { ExperienceSchema, Experience };
