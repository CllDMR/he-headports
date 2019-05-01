const router = require("express-promise-router")();
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const PositionController = require("../../controllers/position");
const TestResultController = require("../../controllers/testResult");
const QuestionController = require("../../controllers/question");
const TestController = require("../../controllers/test");

router.get("/:pID", async function(req, res, next) {
  try {
    const { pID } = req.params;
    if (!pID) throw new Error("pID required");
    const position = await PositionController.findPosition({ pID });

    const tests = await position.testMetaDatas.map(testMetaData => {
      var {
        questions,
        _id,
        testName,
        categoryName,
        estimatedFinishingTime
      } = testMetaData.test;

      var test = {
        questions,
        _id,
        testName,
        categoryName,
        estimatedFinishingTime
      };

      return test;
    });

    return res.json(tests);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pID/start", async function(req, res, next) {
  const { pID } = req.params;
  if (!pID) throw new Error("pID required");
  if (
    req.account.startedPositions &&
    req.account.startedPositions.length !== 0
  ) {
    try {
      for (
        let index = 0;
        index < req.account.startedPositions.length;
        index++
      ) {
        const startedPositionID = req.account.startedPositions[index];
        if (startedPositionID.toString() === pID) {
          // Daha önce bu position'a başvurulmuş
          throw new Error("Daha önce bu position'a başvurulmuş");
        }
      }
    } catch (error) {
      throw error;
    }
  } else {
    const position = await PositionController.findPosition({ pID });

    const test = position.testMetaDatas[0].test;

    var whenStarted = DateTime.fromObject({
      zone: "Europe/Istanbul"
    }).toJSDate();

    var testResult = await TestResultController.newTestResult({
      candidate: req.account._id,
      position: pID,
      test: test._id,
      whenStarted,
      state: "STARTED"
    });

    req.account.startedPositions = [];
    req.account.startedPositions.push(pID);

    req.account.testResults.push(testResult._doc._id);

    req.account.save();

    return res.json({
      pID,
      trID: testResult._doc._id,
      tID: test._id,
      qID: test.questions[0]._id
    });
  }
});

router.get("/:pID-:trID-:tID-:qID/get", async function(req, res, next) {
  const { pID, trID, tID, qID } = req.params;

  if (!pID || !trID || !tID || !qID)
    throw new Error("pID, trID, tID, qID required");

  const testData = await TestController.findTestByID({ tID });

  var questionIndex = testData.questions.indexOf(qID);

  var progression = (questionIndex / testData.questions.length) * 100;

  questionIndex++;

  var questionData = await QuestionController.findQuestionById({ qID });

  const {
    question,
    questionType,
    answersData: { answers }
  } = questionData;

  var questionForSend = {
    questionType,
    questionIndex,
    question,
    answersData: answers,
    progression
  };

  return res.json(questionForSend);
});

router.post("/:pID-:trID-:tID-:qID/answer", async function(req, res, next) {
  var { pID, trID, tID, qID } = req.params;

  var { candidateAnswer } = req.body;

  if (candidateAnswer === undefined)
    throw new Error("candidateAnswer required");

  if (!pID || !trID || !tID || !qID)
    throw new Error("pID, trID, tID, qID required");

  const testData = await TestController.findTestByID({ tID });

  var testResultData = await TestResultController.findTestResultById({
    trID
  });

  const questionData = await QuestionController.findQuestionById({ qID });

  var isCorrect = questionData.answersData.trueAnswer == candidateAnswer;

  testResultData.answers.push({ candidateAnswer, isCorrect });

  if (isCorrect) {
    if (testResultData.result) {
      testResultData.result =
        testResultData.result + (1 / testData.questions.length) * 100;
    } else {
      testResultData.result = 0;
      testResultData.result =
        testResultData.result + (1 / testData.questions.length) * 100;
    }
  }

  await testResultData.save();

  const currentQuestionIndex = testData.questions.indexOf(qID);

  if (currentQuestionIndex + 1 == testData.questions.length) {
    console.log("go next test");

    testResultData.state = "FINISHED";

    testResultData.save();

    const position = await PositionController.findPosition({ pID });

    const test = position.testMetaDatas[1].test;

    var whenStarted = DateTime.fromObject({
      zone: "Europe/Istanbul"
    }).toJSDate();

    var testResult = await TestResultController.newTestResult({
      candidate: req.account._id,
      position: pID,
      test: test._id,
      whenStarted,
      state: "STARTED"
    });

    req.account.testResults.push(testResult._doc._id);

    req.account.save();

    return res.json({
      pID,
      trID: testResult._doc._id,
      tID: test._id,
      qID: test.questions[0]._id
    });
  }

  qID = testData.questions[currentQuestionIndex + 1];

  const sendData = { pID, trID, tID, qID };

  return res.json(sendData);
});

module.exports = router;
