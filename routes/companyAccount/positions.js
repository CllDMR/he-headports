var express = require("express");
const router = require("express-promise-router")();

const mongoose = require("mongoose");

const PositionController = require("../../controllers/position");
const CompanyController = require("../../controllers/company");
const CompanyAccountController = require("../../controllers/companyAccount");
const TestMetaDataController = require("../../controllers/testMetaData");

router.get("/", async function(req, res, next) {
  const positions = await PositionController.findPositions({
    cID: req.account.company
  });
  return res.json({ positions });
});

router.post("/", async function(req, res, next) {
  const {
    name,
    startDate,
    finishDate,
    wage,
    workType,
    token,
    address,
    city,
    district,
    postCode
  } = req.body;
  if (
    name &&
    startDate &&
    finishDate &&
    wage &&
    workType &&
    token &&
    address &&
    city &&
    district &&
    postCode
  ) {
    var companyAccount = await CompanyAccountController.findAccountById(token);

    const positionData = {
      name,
      startDate,
      finishDate,
      wage,
      workType,
      address,
      city,
      district,
      postCode,
      HRStaff: new mongoose.mongo.ObjectId(companyAccount._doc._id),
      company: new mongoose.mongo.ObjectId(companyAccount._doc.company._id)
    };
    const position = await PositionController.newPosition(positionData);

    const company = await CompanyController.findAccountById({
      id: companyAccount._doc.company._id
    });

    await company._doc.positions.push(
      new mongoose.mongo.ObjectId(position._id)
    );
    await company.save();
    return res.json({ positionData: position });
  } else {
    throw new Error(
      "name startDate finishDate wage workType address city district postCode token required"
    );
  }
});

router.post("/:pID/addNewTestMetaData", async function(req, res, next) {
  const { pID } = req.params;
  const { selectedTestIDs } = req.body;

  var position = await PositionController.findPosition({ pID });

  var testMetaDatas = [];

  for (let index = 0; index < selectedTestIDs.length; index++) {
    const selectedTestID = selectedTestIDs[index];
    const testMetaData = await TestMetaDataController.newTestMetaData({
      pID,
      selectedTestID,
      cID: req.account._id
    });
    testMetaDatas.push(testMetaData._id);
  }

  position.testMetaDatas = testMetaDatas;

  await position.save();

  return res.json({
    statusMsg: "TestMetaData Created and Added to Position"
  });
});

router.get("/:pID", async function(req, res, next) {
  const { pID } = req.params;
  if (!pID) {
    throw new Error("pID required");
  }
  const position = await PositionController.findPosition({ pID });

  return res.json(position);
});

router.delete("/:pID/testMetaData/:tID", async function(req, res) {
  const { pID, tID } = req.params;
  if (pID && tID) {
    const position = await PositionController.findPosition({
      pID
    });

    position.testMetaDatas = position.testMetaDatas.filter(
      testMetaData => testMetaData._id != tID
    );

    position.save();

    return res.json({ statusMsg: "asd" });
  } else throw new Error("pID and tID required");
});

module.exports = router;
