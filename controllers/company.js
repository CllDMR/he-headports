const { Company } = require("../models/company");
const { CompanyAccount } = require("../models/companyAccount");

const AuthController = require("../controllers/auth");

const mongoose = require("mongoose");

module.exports = {
  newAccount: async function({ companyName, address }) {
    try {
      const newCompany = await new Company({ companyName, address });
      const company = await newCompany.save();
      return company._doc;
    } catch (error) {
      throw error;
    }
  },
  newCompanyAccount: async function({
    companyId,
    firstName,
    lastName,
    department,
    userName,
    password,
    area,
    email
  }) {
    try {
      const oldCompany = await Company.findById(companyId);

      const newCompanyAccount = await new CompanyAccount({
        firstName,
        lastName,
        department,
        userName,
        password,
        area,
        email
      });

      await oldCompany._doc.companyUsers.push(newCompanyAccount._doc._id);
      const newCompany = await oldCompany.save();

      newCompanyAccount._doc.company = new mongoose.mongo.ObjectId(companyId);
      const companyAccount = await newCompanyAccount.save();

      return {
        companyAccount: companyAccount._doc,
        company: newCompany._doc
      };
    } catch (error) {
      throw error;
    }
  },
  findAll: async function() {
    try {
      const companies = await Company.find()
        .populate("companyUsers")
        .populate("positions");

      if (!companies) {
        const err = new Error("No Company");
        err.status = 401;
        throw err;
      }
      return companies;
    } catch (error) {
      throw error;
    }
  },
  findAccount: async function({ companyName, address }) {
    try {
      const company = await Company.findOne({ companyName, address })
        .populate("companyUsers")
        .populate("positions");

      if (!company) {
        const err = new Error("No Company");
        err.status = 401;
        throw err;
      }
      return company;
    } catch (error) {
      throw error;
    }
  },
  findAccountById: async function({ id }) {
    try {
      const company = await Company.findById(id)
        .populate("companyUsers")
        .populate("positions");

      if (!company) {
        throw new Error("No Company");
      }
      return company._doc;
    } catch (error) {
      throw error;
    }
  }
};
