const router = require("express-promise-router")();

const TestController = require("../../controllers/test");

router.get("/", async function(req, res, next) {
  var tests = await TestController.findTests();
  return res.json(tests);
});

router.post("/", async function(req, res) {
  const {
    questions,
    testName,
    categoryName,
    estimatedFinishingTime
  } = req.body;

  if (!questions) throw new Error("questions required");
  if (!testName) throw new Error("testName required");
  if (!categoryName) throw new Error("categoryName required");
  if (!estimatedFinishingTime)
    throw new Error("estimatedFinishingTime required");

  await TestController.newTest({
    questions,
    testName,
    categoryName,
    estimatedFinishingTime
  });
  return res.json({ statusMsg: "Test Created" });
});

router.get("/:tID", async function(req, res, next) {
  var test = await TestController.findTestByID({
    tID: req.params.tID
  });

  return res.json(test);
});

module.exports = router;
