var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

var AdminAccountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

AdminAccountSchema.plugin(beautifyUnique);

AdminAccountSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

AdminAccountSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var AdminAccount = mongoose.model("AdminAccount", AdminAccountSchema);

module.exports = { AdminAccountSchema, AdminAccount };
