const router = require("express-promise-router")();

router.use("/personalInfo", require("./personalInfo"));
router.use("/experiences", require("./experiences"));
router.use("/tests", require("./tests"));

module.exports = router;
