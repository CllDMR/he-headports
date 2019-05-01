const router = require("express-promise-router")();

const QuestionController = require("../controllers/question");
const TestController = require("../controllers/test");

router.post("/question", async function(req, res) {
  const { questionType, paragraph, question, answersData } = req.body;

  switch (questionType) {
    case 1:
      // paragraf tipi -> question + answers + paragraph
      await QuestionController.newQuestion({
        questionType,
        paragraph,
        question,
        answersData
      });
      break;
    case 2:
      // question + answers

      await QuestionController.newQuestion({
        questionType,
        question,
        answersData
      });
      break;
    case 3:
      // question + textInput ( frontend )

      await QuestionController.newQuestion({ questionType, question });
      break;
    default:
      break;
  }

  return res.json({ statusMsg: "Question Created." });
});

router.post("/test", async function(req, res) {
  const {
    questions,
    testName,
    categoryName,
    estimatedFinishingTime
  } = req.body;

  await TestController.newTest({
    questions,
    testName,
    categoryName,
    estimatedFinishingTime
  });
  return res.json({ statusMsg: "Test Created" });
});

module.exports = router;
