const router = require("express-promise-router")();

const CompanyController = require("../../controllers/company");
const CompanyAccountController = require("../../controllers/companyAccount");

router.get("/", async function(req, res) {
  const companies = await CompanyController.findAll();
  return res.json(companies);
});

router.post("/", async function(req, res) {
  const {
    companyId,
    firstName,
    lastName,
    department,
    userName,
    password,
    area,
    email
  } = req.body;
  if (
    companyId &&
    firstName &&
    lastName &&
    department &&
    userName &&
    password &&
    area &&
    email
  ) {
    const newCompanyAccount = await CompanyController.newCompanyAccount(data);
    return res.json(newCompanyAccount);
  } else {
    throw new Error(
      "companyId ,firstName ,lastName ,department ,userName ,password ,area ,email required"
    );
  }
});

module.exports = router;
