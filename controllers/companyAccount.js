const { CompanyAccount } = require("../models/companyAccount");
const { Company } = require("../models/company");
const bcrypt = require("bcrypt");

module.exports = {
  newAccount: async function(data) {
    try {
      const newCompanyAccount = await new CompanyAccount(data);
      const companyAccount = await newCompanyAccount.save();
      return companyAccount._doc;
    } catch (error) {
      throw error;
    }
  },
  findAccount: async function({ userName, password }) {
    try {
      const account = await CompanyAccount.findOne({ userName });

      if (!account) throw new Error("No CompanyAccount");

      const match = await bcrypt.compare(password, account.password);

      if (match) return account;
      else throw new Error("Wrong password");
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
      if (!account) throw new Error("No CompanyAccount");

      return account._doc;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
  findAccountByIdWithOutPopulate: async function(data) {
    try {
      const account = await CompanyAccount.findById(data);

      if (!account) throw new Error("No CompanyAccount");

      return account;
    } catch (error) {
      throw error;
    }
  }
};
