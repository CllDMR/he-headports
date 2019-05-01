const { Auth } = require("../models/auth");

module.exports = {
  newAuth: async function(data) {
    try {
      const newAuth = await new Auth(data);
      const auth = await newAuth.save();
      return auth._doc;
    } catch (e) {
      console.log("e", e);
      return { err: e.message };
    }
  },
  findAuth: async function({ UID, accountType }) {
    try {
      console.log("2", { UID, accountType });

      const auth = await Auth.findOne({ UID, accountType });

      if (!auth) {
        const err = new Error("No Auth");
        err.status = 401;
        throw err;
      }

      return { ...auth._doc };
    } catch (e) {
      return { err: e.message };
    }
  },
  findAuthById: async function({ AID }) {
    try {
      console.log("3", AID);

      const auth = await Auth.findById(AID);

      if (!auth) {
        const err = new Error("No Auth");
        err.status = 401;
        throw err;
      }

      return { ...auth._doc };
    } catch (e) {
      return { err: e.message };
    }
  }
};
