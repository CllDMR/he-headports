const router = require("express-promise-router")();

const AuthController = require("../controllers/auth");

const AdminAccountController = require("../controllers/adminAccount");
const CandidateAccountController = require("../controllers/candidateAccount");
const CompanyAccountController = require("../controllers/companyAccount");

//Admin signIn ( auto, normal ), signUp

router.get("/admin/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");

  if (AID) {
    const account = await AdminAccountController.findAccountById(AID);
    return res.json(account);
  } else {
    var error = new Error("authorization required");
    throw error;
  }
});

router.post("/admin/signIn/normal", async function(req, res, next) {
  const { userName, password } = req.body;

  if (userName && password) {
    const AdminAccount = await AdminAccountController.findAccount({
      userName,
      password
    });
    if (AdminAccount.err) {
      return res.json({ err: AdminAccount.err });
    }

    const adminAuth = await AuthController.findAuth({
      UID: AdminAccount._doc._id,
      accountType: 1
    });

    return res.json({ ...AdminAccount._doc, adminAuth });
  } else {
    return res.json({ err: "userName, password required" });
  }
});

router.post("/admin/signUp", async function(req, res, next) {
  const { userName, password } = req.body;
  if (userName && password) {
    const AdminAccount = await AdminAccountController.newAccount({
      userName,
      password
    });
    if (AdminAccount.err) {
      return res.json({ err: AdminAccount.err });
    }
    const newAuth = await AuthController.newAuth({
      UID: AdminAccount._id,
      accountType: 1
    });
    return res.json({ ...AdminAccount, ...newAuth });
  } else {
    return res.json({ err: "userName, password required" });
  }
});

//CompanyAccount signIn ( auto, normal ), signUp

router.get("/companyAccount/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");

  if (AID) {
    const account = await CompanyAccountController.findAccountById(AID);
    return res.json(account);
  } else {
    var error = new Error("authorization required");
    throw error;
  }
});

router.post("/companyAccount/signIn/normal", async function(req, res, next) {
  const { userName, password } = req.body;

  if (userName && password) {
    const companyAccount = await CompanyAccountController.findAccount({
      userName,
      password
    });

    const { _id, __v, ...data } = companyAccount._doc;

    return res.json({ token: _id, ...data });
  } else {
    return res.json({ err: "userName, password required" });
  }
});

router.post("/companyAccount/signUp", async function(req, res, next) {
  const { email, userName, password } = req.body;
  if (email && userName && password) {
    const account = await CompanyAccountController.newAccount({
      email,
      userName,
      password
    });

    return res.json(account);
  } else {
    throw new Error("email, userName, password required");
  }
});

//Candidate signIn ( auto, normal ), signUp

router.get("/candidate/signIn/auto", async function(req, res, next) {
  const AID = req.get("authorization");

  if (AID) {
    const account = await CandidateAccountController.findAccountById(AID);
    return res.json(account);
  } else {
    var error = new Error("authorization required");
    throw error;
  }
});

router.post("/candidate/signIn/normal", async function(req, res, next) {
  const { userName, password } = req.body;

  if (userName && password) {
    const CandidateAccount = await CandidateAccountController.findAccount({
      userName,
      password
    });

    const { _id, __v, ...others } = CandidateAccount._doc;

    return res.json({ token: _id, ...others });
  } else {
    return res.json({ err: "userName, password required" });
  }
});

router.post("/candidate/signUp", async function(req, res, next) {
  const { email, userName, password } = req.body;
  if (email && userName && password) {
    const candidateAccount = await CandidateAccountController.newAccount({
      email,
      userName,
      password
    });

    const { _id, __v, ...others } = candidateAccount;
    return res.json({ token: _id, ...others });
  } else {
    throw new Error("email, userName, password required");
  }
});

router.use(
  "/admin",
  async function(req, res, next) {
    try {
      const AID = req.get("authorization");
      if (AID) {
        const account = await AdminAccountController.findAccountById(AID);
        req.account = account;
        next();
      } else {
        var error = new Error("authorization required");
        throw error;
      }
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
      const AID = req.headers["authorization"];
      if (AID) {
        const account = await CandidateAccountController.findAccountById(AID);
        req.account = account;
        next();
        // test edilmesi gerekiyor
        // return next();
      } else {
        var error = new Error("authorization required");
        throw error;
      }
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
      if (AID) {
        const account = await CompanyAccountController.findAccountByIdWithOutPopulate(
          AID
        );
        req.account = account;
        next();
      } else {
        var error = new Error("authorization required");
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
  require("./companyAccount")
);
router.use("/test", require("./test"));

module.exports = router;
