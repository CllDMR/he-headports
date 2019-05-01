const { Test } = require("../models/test");

module.exports = {
  newTest: async function(data) {
    try {
      const newTest = await new Test(data);
      const test = await newTest.save();
    } catch (e) {
      console.log("e", e);
      return { err: e.message };
    }
  },
  findTests: async function() {
    try {
      const tests = await Test.find();
      return tests;
    } catch (error) {
      throw error;
    }
  },
  findTestByID: async function({ tID }) {
    try {
      const test = await Test.findById(tID);
      return test;
    } catch (error) {
      throw error;
    }
  }
};
