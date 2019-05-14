const router = require("express-promise-router")();

const QuestionController = require("../../controllers/question");

router.get("/", async function(req, res, next) {
  var questions = await QuestionController.findAllQuestion();
  return res.json(questions);
});

router.post("/", async function(req, res, next) {
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

router.get("/:qID", async function(req, res, next) {
  var question = await QuestionController.findQuestionById({
    qID: req.params.qID
  });

  return res.json(question);
});

module.exports = router;
