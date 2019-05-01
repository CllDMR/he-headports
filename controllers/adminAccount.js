const { AdminAccount } = require("../models/adminAccount");
const bcrypt = require("bcrypt");

module.exports = {
  newAccount: async function(data) {
    try {
      const newAdminAccount = await new AdminAccount(data);
      const adminAccount = await newAdminAccount.save();
      return adminAccount._doc;
    } catch (e) {
      return { err: e.message };
    }
  },
  findAccount: async function({ userName, password }) {
    try {
      const account = await AdminAccount.findOne({ userName });

      if (!account) {
        const err = new Error("No AdminAccount");
        err.status = 401;
        throw err;
      }

      const match = await bcrypt.compare(password, account.password);

      if (match) {
        //login
        return { ...account };
      } else {
        return { err: "Wrong password" };
      }
    } catch (e) {
      return { err: e.message };
    }
  },
  findAccountById: async function(data) {
    try {
      const account = await AdminAccount.findById(data);

      if (!account) {
        const err = new Error("No AdminAccount");
        err.status = 401;
        throw err;
      }

      return account;
    } catch (e) {
      return { err: e.message };
    }
  }
};
