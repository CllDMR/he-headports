var mongoose = require("mongoose");

var TestResultSchema = new mongoose.Schema({
  state: String,
  answers: [{ candidateAnswer: Number, isCorrect: Boolean }],
  result: Number,
  candidate: { type: mongoose.SchemaTypes.ObjectId, ref: "CandidateAccount" },
  position: { type: mongoose.SchemaTypes.ObjectId, ref: "Position" },
  test: { type: mongoose.SchemaTypes.ObjectId, ref: "Test" },
  whenStarted: Date,
  whenFinished: Date
});

var TestResult = mongoose.model("TestResult", TestResultSchema);

module.exports = { TestResultSchema, TestResult };
