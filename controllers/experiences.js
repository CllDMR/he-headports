const { Experience } = require("../models/experience");

module.exports = {
  newExperience: async function({
    candidateAccount,
    companyName,
    positionName,
    sector,
    startDate,
    finishDate,
    workStyle,
    country,
    city
  }) {
    try {
      const newExperience = await new Experience({
        candidateAccount,
        companyName,
        positionName,
        sector,
        startDate,
        finishDate,
        workStyle,
        country,
        city
      });

      const experience = await newExperience.save();
      return experience._doc;
    } catch (error) {
      throw error;
    }
  },
  findExperience: async function(data) {
    try {
      const experience = await Experience.findOne(data);

      if (!experience) throw new Error("No Experience");

      return experience;
    } catch (error) {
      throw error;
    }
  },
  findExperienceById: async function({ id }) {
    try {
      const experience = await Experience.findById(id);

      if (!experience) throw new Error("No Experience");

      return experience;
    } catch (error) {
      throw error;
    }
  }
};
