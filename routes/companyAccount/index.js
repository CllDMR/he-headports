const router = require("express-promise-router")();

router.use("/tests", require("./tests"));
router.use("/positions", require("./positions"));

module.exports = router;
