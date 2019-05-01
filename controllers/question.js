const { Question } = require("../models/question");

module.exports = {
  newQuestion: async function(data) {
    try {
      const newQuestion = await new Question(data);
      const question = await newQuestion.save();
      return question;
    } catch (e) {
      console.log("e", e);
      return { err: e.message };
    }
  },
  findQuestionById: async function({ qID }) {
    try {
      const question = await Question.findById(qID);

      if (!question) throw new Error("No Question");

      return question;
    } catch (error) {
      throw error;
    }
  }
};
