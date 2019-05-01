const { TestMetaData } = require("../models/testMetaData");

module.exports = {
  newTestMetaData: async function({ pID, selectedTestID, cID }) {
    try {
      const newTestMetaData = await new TestMetaData({
        test: selectedTestID,
        whoCreated: cID
      });

      const testMetaData = await newTestMetaData.save();

      return testMetaData;
    } catch (e) {
      console.log("e", e);
      return { err: e.message };
    }
  },
  findTestMetaData: async function() {
    try {
      const testMetaData = await TestMetaData.find();
      return testMetaData;
    } catch (e) {
      console.log("e", e);
      return { err: e.message };
    }
  }
};
