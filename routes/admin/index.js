const router = require("express-promise-router")();

router.use("/tests", require("./tests"));
router.use("/questions", require("./questions"));
router.use("/companies", require("./companies"));
router.use("/companyAccounts", require("./companyAccounts"));

module.exports = router;
