const { Question } = require("../models/question");

module.exports = {
  newQuestion: async function(data) {
    try {
      const newQuestion = await new Question(data);
      const question = await newQuestion.save();
      return question;
    } catch (error) {
      throw error;
    }
  },
  findAllQuestion: async function() {
    try {
      const questions = await Question.find();
      return questions;
    } catch (error) {
      throw error;
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
