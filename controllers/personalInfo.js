const { PersonalInfo } = require("../models/personalInfo");

module.exports = {
  newPersonalInfo: async function({
    candidateAccount,
    firstName,
    lastName,
    gender,
    phoneNumber,
    educationLevel
  }) {
    try {
      const newPersonalInfo = await new PersonalInfo({
        candidateAccount,
        firstName,
        lastName,
        gender,
        phoneNumber,
        educationLevel
      });

      const personalInfo = await newPersonalInfo.save();
      return personalInfo._doc;
    } catch (error) {
      throw error;
    }
  },
  findPersonalInfo: async function(data) {
    try {
      const personalInfo = await PersonalInfo.findOne(data);

      if (!personalInfo) throw new Error("No PersonalInfo");

      return personalInfo;
    } catch (error) {
      throw error;
    }
  },
  findPersonalInfoById: async function(data) {
    try {
      const personalInfo = await PersonalInfo.findById(data);

      if (!personalInfo) throw new Error("No PersonalInfo");

      return personalInfo;
    } catch (error) {
      throw error;
    }
  }
};
