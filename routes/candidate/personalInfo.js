const router = require("express-promise-router")();
const mongoose = require("mongoose");

const PersonalInfoController = require("../../controllers/personalInfo");

router.post("/", async function(req, res, next) {
  const {
    token,
    firstName,
    lastName,
    gender,
    phoneNumber,
    educationLevel
  } = req.body;

  if (
    token &&
    firstName &&
    lastName &&
    gender &&
    phoneNumber &&
    educationLevel
  ) {
    var personalInfo = await PersonalInfoController.newPersonalInfo({
      candidateAccount: token,
      firstName,
      lastName,
      gender,
      phoneNumber,
      educationLevel
    });
    req.account.personalInfo = mongoose.Types.ObjectId(personalInfo._id);
    await req.account.save();
    return res.json(personalInfo);
  } else {
    throw new Error(
      "token, firstName, lastName, gender, phoneNumber, educationLevel required"
    );
  }
});

module.exports = router;
