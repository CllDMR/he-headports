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

  if (!companyId) throw new Error("companyId  required");
  if (!firstName) throw new Error("firstName  required");
  if (!lastName) throw new Error("lastName  required");
  if (!department) throw new Error("department  required");
  if (!userName) throw new Error("userName  required");
  if (!password) throw new Error("password  required");
  if (!area) throw new Error("area  required");
  if (!email) throw new Error("email  required");

  const newCompanyAccount = await CompanyController.newCompanyAccount({
    companyId,
    firstName,
    lastName,
    department,
    userName,
    password,
    area,
    email
  });
  return res.json(newCompanyAccount);
});

module.exports = router;
