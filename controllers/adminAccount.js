const { AdminAccount } = require("../models/adminAccount");
const bcrypt = require("bcrypt");

module.exports = {
  newAccount: async function(data) {
    try {
      const newAdminAccount = await new AdminAccount(data);
      const adminAccount = await newAdminAccount.save();
      return adminAccount._doc;
    } catch (error) {
      throw error;
    }
  },
  findAccount: async function({ userName, password }) {
    try {
      const account = await AdminAccount.findOne({ userName });

      if (!account) throw new Error("No AdminAccount");

      const match = await bcrypt.compare(password, account.password);

      if (match) return account._doc;
      else throw new Error("Wrong password");
    } catch (error) {
      throw error;
    }
  },
  findAccountById: async function(data) {
    try {
      const account = await AdminAccount.findById(data);

      if (!account) throw new Error("No AdminAccount");

      return account._doc;
    } catch (error) {
      throw error;
    }
  }
};
