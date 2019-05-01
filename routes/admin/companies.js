const router = require("express-promise-router")();

const CompanyController = require("../../controllers/company");

router.get("/", async function(req, res) {
  const companies = await CompanyController.findAll();
  return res.json(companies);
});

router.post("/", async function(req, res) {
  const { companyName, address } = req.body;

  if (companyName && address) {
    const Company = await CompanyController.newAccount({
      companyName,
      address
    });

    return res.json({ companyToken: Company._id });
  } else {
    throw new Error("companyName, address required");
  }
});

router.get("/:companyToken", async function(req, res, next) {
  const { companyToken } = req.params;
  if (!companyToken) {
    throw new Error("companyToken required");
  }
  const company = await CompanyController.findAccountById({
    id: companyToken
  });
  return res.json(company);
});
router.patch("/:companyToken", function(req, res, next) {
  const { companyToken } = req.params;
  res.send("OKAY");
});
router.delete("/:companyToken", function(req, res, next) {
  const { companyToken } = req.params;
  res.send("OKAY");
});

module.exports = router;
