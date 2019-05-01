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

      if (!account) {
        const err = new Error("No CandidateAccount");
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
      const account = await CandidateAccount.findById(data);

      if (!account) {
        const err = new Error("No CandidateAccount");
        err.status = 401;
        throw err;
      }

      return account;
    } catch (e) {
      return { err: e.message };
    }
  }
};
