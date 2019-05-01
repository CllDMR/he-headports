const router = require("express-promise-router")();

const TestController = require("../../controllers/test");

router.get("/", async function(req, res, next) {
  const tests = await TestController.findTests();
  return res.json(tests);
});

module.exports = router;
