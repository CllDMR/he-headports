var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
  questionType: Number,
  paragraph: String,
  question: String,
  answersData: { answers: [String], trueAnswer: Number }
  // image ??? database'de saklamak lazım ve ne ile ulaşılacak buna ( estimated type filename with gridfs )
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = { QuestionSchema, Question };

/*
questionType => 
	1 -> question + answers + paragraph
	2 -> question + answers
	3 -> question + textInput ( frontend )


*/
