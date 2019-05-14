const router = require("express-promise-router")();

const AdminAccountController = require("../controllers/adminAccount");
const CandidateAccountController = require("../controllers/candidateAccount");
const CompanyAccountController = require("../controllers/companyAccount");

//Admin signIn ( auto, normal ), signUp

router.get("/admin/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");
  if (!AID) throw new Error("authorization required");

  const account = await AdminAccountController.findAccountById(AID);
  const { _id, __v, password: pass, ...data } = account;
  return res.json({});
});

router.post("/admin/signIn/normal", async function(req, res, next) {
  if (!req.body.userName) throw new Error("userName required");
  if (!req.body.password) throw new Error("password required");

  const account = await AdminAccountController.findAccount({
    userName: req.body.userName,
    password: req.body.password
  });

  const { _id, __v, password: pass, ...data } = account;

  return res.json({ token: _id });
});

router.post("/admin/signUp", async function(req, res, next) {
  const { userName, password } = req.body;

  const AID = req.get("authorization");
  if (!AID) throw new Error("authorization required");

  await AdminAccountController.findAccountById(AID);

  if (!userName) throw new Error("userName required");
  if (!password) throw new Error("password required");

  try {
    const account = await AdminAccountController.newAccount({
      userName,
      password
    });

    const { _id, __v, password: pass, ...data } = account;
    return res.json({ token: _id });
  } catch (error) {
    if (error.errors) {
      for (const field in error.errors) {
        if (error.errors.hasOwnProperty(field)) {
          const fieldName = error.errors[field];
          throw new Error(fieldName.message);
        }
      }
    }
    throw error;
  }
});

//CompanyAccount signIn ( auto, normal ), signUp

router.get("/companyAccount/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");
  if (!AID) throw new Error("authorization required");

  const account = await CompanyAccountController.findAccountById(AID);
  const { _id, __v, password: pass, ...data } = account;
  return res.json(data);
});

router.post("/companyAccount/signIn/normal", async function(req, res, next) {
  const { userName, password } = req.body;

  if (!userName) throw new Error("userName required");
  if (!password) throw new Error("password required");

  const account = await CompanyAccountController.findAccount({
    userName,
    password
  });

  const { _id, __v, password: pass, ...data } = account;

  return res.json({ token: _id, ...data });
});

router.post("/companyAccount/signUp", async function(req, res, next) {
  const { email, userName, password } = req.body;

  const AID = req.get("authorization");
  if (!AID) throw new Error("authorization required");

  const AdminAccount = await AdminAccountController.findAccountById(AID); //Kontrol için -- Bu işlemi sadece admin yapabilir

  if (!email) throw new Error("email required");
  if (!userName) throw new Error("userName required");
  if (!password) throw new Error("password required");

  try {
    const account = await CompanyAccountController.newAccount({
      email,
      userName,
      password
    });

    const { _id, __v, password: pass, ...data } = account;

    return res.json({ token: _id, ...data });
  } catch (error) {
    if (error.errors) {
      for (const field in error.errors) {
        if (error.errors.hasOwnProperty(field)) {
          const fieldName = error.errors[field];
          throw new Error(fieldName.message);
        }
      }
    }
    throw error;
  }
});

//Candidate signIn ( auto, normal ), signUp

router.get("/candidate/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");
  if (!AID) throw new Error("authorization required");

  const account = await CandidateAccountController.findAccountById(AID);
  const { _id, __v, password: pass, ...data } = account;

  return res.json(data);
});

router.post("/candidate/signIn/normal", async function(req, res, next) {
  const { userName, password } = req.body;
  if (!userName) throw new Error("userName required");
  if (!password) throw new Error("password required");

  const account = await CandidateAccountController.findAccount({
    userName,
    password
  });
  const { _id, __v, password: pass, ...data } = account;

  return res.json({ token: _id, ...data });
});

router.post("/candidate/signUp", async function(req, res, next) {
  const { email, userName, password } = req.body;
  if (!email) throw new Error("email required");
  if (!userName) throw new Error("userName required");
  if (!password) throw new Error("password required");

  try {
    const account = await CandidateAccountController.newAccount({
      email,
      userName,
      password
    });

    const { _id, __v, password: pass, ...data } = account;

    return res.json({ token: _id, ...data });
  } catch (error) {
    if (error.errors) {
      for (const field in error.errors) {
        if (error.errors.hasOwnProperty(field)) {
          const fieldName = error.errors[field];
          throw new Error(fieldName.message);
        }
      }
    }
    throw error;
  }
});

router.use(
  "/admin",
  async function(req, res, next) {
    try {
      const AID = req.get("authorization");
      if (!AID) throw new Error("authorization required");
      const account = await AdminAccountController.findAccountById(AID);
      req.account = account;
      next();
    } catch (error) {
      throw error;
    }
  },
  require("./admin")
);

router.use(
  "/candidate",
  async function(req, res, next) {
    try {
      const AID = req.get("authorization");
      if (!AID) throw new Error("authorization required");
      const account = await CandidateAccountController.findAccountById(AID);
      req.account = account;
      next();
      // test edilmesi gerekiyor
      // return next();
    } catch (error) {
      throw error;
      // test edilmesi gerekiyor
      return next(error);
    }
  },
  require("./candidate")
);

router.use(
  "/companyAccount",
  async function(req, res, next) {
    try {
      const AID = req.get("authorization");
      if (!AID) throw new Error("authorization required");
      const account = await CompanyAccountController.findAccountByIdWithOutPopulate(
        AID
      );

      //TODO: account'a bak account._doc şeklinde mi

      req.account = account;
      next();
    } catch (error) {
      throw error;
    }
  },
  require("./companyAccount")
);

module.exports = router;
