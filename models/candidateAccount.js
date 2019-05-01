var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var CandidateAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  personalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalInfo"
  },
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience"
    }
  ],
  testResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestResult"
    }
  ],
  startedPositions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position"
    }
  ]
});

CandidateAccountSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

CandidateAccountSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var CandidateAccount = mongoose.model(
  "CandidateAccount",
  CandidateAccountSchema
);

module.exports = { CandidateAccountSchema, CandidateAccount };
