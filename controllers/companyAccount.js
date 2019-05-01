const { CompanyAccount } = require("../models/companyAccount");
const { Company } = require("../models/company");
const bcrypt = require("bcrypt");

module.exports = {
  newAccount: async function(data) {
    try {
      const newCompanyAccount = await new CompanyAccount(data);
      const companyAccount = await newCompanyAccount.save();
      return companyAccount._doc;
    } catch (e) {
      return { err: e.message };
    }
  },
  findAccount: async function({ userName, password }) {
    try {
      const account = await CompanyAccount.findOne({ userName });

      if (!account) {
        const err = new Error("No CompanyAccount");
        err.status = 401;
        throw err;
      }

      const match = await bcrypt.compare(password, account.password);

      if (match) {
        //login
        return account;
      } else {
        throw new Error("Wrong password");
      }
    } catch (error) {
      throw error;
    }
  },
  findAccountById: async function(data) {
    try {
      const account = await CompanyAccount.findById(data).populate({
        path: "company",
        populate: {
          path: "positions",
          populate: [
            { path: "HRStaff", model: "CompanyAccount" },
            { path: "tests", model: "Test" }
          ]
        }
      });
      if (!account) {
        const err = new Error("No CompanyAccount");
        err.status = 401;
        throw err;
      }

      return { ...account };
    } catch (e) {
      return { err: e.message };
    }
  },
  findAccountByIdWithOutPopulate: async function(data) {
    try {
      const account = await CompanyAccount.findById(data);
      if (!account) {
        const err = new Error("No CompanyAccount");
        err.status = 401;
        throw err;
      }

      return account;
    } catch (e) {
      return { err: e.message };
    }
  }
};
