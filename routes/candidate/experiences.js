const router = require("express-promise-router")();
const mongoose = require("mongoose");

const ExperiencesController = require("../../controllers/experiences");

router.post("/", async function(req, res, next) {
  const { token, experiences } = req.body;

  if (token && experiences) {
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

        if (
          companyName &&
          positionName &&
          sector &&
          startDate &&
          finishDate &&
          workStyle &&
          country &&
          city
        ) {
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
        } else {
          throw new Error(
            "companyName, positionName, sector, startDate, finishDate, workStyle, country, city required at index: " +
              experienceIndex
          );
        }
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
