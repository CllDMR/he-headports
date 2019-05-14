const { CandidateAccount } = require("../models/candidateAccount");
const bcrypt = require("bcrypt");

module.exports = {
  newAccount: async function(data) {
    try {
      const newCandidateAccount = await new CandidateAccount(data);
      const candidateAccount = await newCandidateAccount.save();
      return candidateAccount._doc;
    } catch (error) {
      throw error;
    }
  },
  findAccount: async function({ userName, password }) {
    try {
      const account = await CandidateAccount.findOne({ userName });

      if (!account) throw new Error("No CandidateAccount");

      const match = await bcrypt.compare(password, account.password);

      if (match) account._doc;
      else throw new Error("Wrong password");
    } catch (error) {
      throw error;
    }
  },
  findAccountById: async function(data) {
    try {
      const account = await CandidateAccount.findById(data);

      if (!account) throw new Error("No CandidateAccount");

      return account;
    } catch (error) {
      throw error;
    }
  }
};
