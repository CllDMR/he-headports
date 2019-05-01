const { TestResult } = require("../models/testResult");

module.exports = {
  newTestResult: async function({ candidate, whenStarted, state }) {
    try {
      const newTestResult = await new TestResult({
        state,
        candidate,
        whenStarted
      });

      const testResult = await newTestResult.save();

      return testResult;
    } catch (error) {
      throw error;
    }
  },
  findTestResults: async function() {
    try {
      const testResults = await TestResult.find();
      return testResults;
    } catch (error) {
      throw error;
    }
  },
  findTestResultById: async function({ trID }) {
    try {
      const testResult = await TestResult.findById(trID);
      return testResult;
    } catch (error) {
      throw error;
    }
  }
};
