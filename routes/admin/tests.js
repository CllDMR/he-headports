const router = require("express-promise-router")();

router.get("/", function(req, res, next) {
  res.send("OKAY");
});

router.get("/:testNo", function(req, res, next) {
  res.send("OKAY");
});
router.patch("/:testNo", function(req, res, next) {
  res.send("OKAY");
});
router.delete("/:testNo", function(req, res, next) {
  res.send("OKAY");
});

router.get("/newTest", function(req, res, next) {
  res.send("OKAY");
});
router.post("/newTest", function(req, res, next) {
  res.send("OKAY");
});

module.exports = router;
