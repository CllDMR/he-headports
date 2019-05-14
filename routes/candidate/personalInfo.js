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

  if (!token) throw new Error("token required");
  if (!firstName) throw new Error("First Name required");
  if (!lastName) throw new Error("Last Name required");
  if (!gender) throw new Error("Gender required");
  if (!phoneNumber) throw new Error("Phone Number required");
  if (!educationLevel) throw new Error("Education Level required");

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
});

module.exports = router;
