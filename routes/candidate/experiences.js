const router = require("express-promise-router")();
const mongoose = require("mongoose");

const ExperiencesController = require("../../controllers/experiences");

router.post("/", async function(req, res, next) {
  const { token, experiences } = req.body;

  if (token && experiences) {
    await Promise.all(
      experiences.map(async (experience, experienceIndex) => {
        const {
          companyName,
          positionName,
          sector,
          startDate,
          finishDate,
          workStyle,
          country,
          city
        } = experience;

        if (!companyName)
          throw new Error(
            "Company Name required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!positionName)
          throw new Error(
            "Position Name required at " +
              (experienceIndex + 1) +
              ". Experience"
          );
        if (!sector)
          throw new Error(
            "Sector required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!startDate)
          throw new Error(
            "Start Date required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!finishDate)
          throw new Error(
            "Finish Date required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!workStyle)
          throw new Error(
            "Work Style required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!country)
          throw new Error(
            "Country required at " + (experienceIndex + 1) + ". Experience"
          );
        if (!city)
          throw new Error(
            "City required at " + (experienceIndex + 1) + ". Experience"
          );
      })
    );

    var experienceIDS = await Promise.all(
      experiences.map(async (experience, experienceIndex) => {
        const {
          companyName,
          positionName,
          sector,
          startDate,
          finishDate,
          workStyle,
          country,
          city
        } = experience;

        var _experience = await ExperiencesController.newExperience({
          candidateAccount: token,
          companyName,
          positionName,
          sector,
          startDate,
          finishDate,
          workStyle,
          country,
          city
        });

        return _experience._id;
      })
    );
    experienceIDS.forEach(ID => {
      req.account.experiences.push(mongoose.Types.ObjectId(ID));
    });
    await req.account.save();
    return res.json(experienceIDS);
  } else {
    throw new Error("token, experiences required");
  }
});

module.exports = router;
