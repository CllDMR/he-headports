var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var CompanyAccountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  email: {
    type: String,
    required: true
  }
});

CompanyAccountSchema.pre("save", async function(next) {
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

CompanyAccountSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var CompanyAccount = mongoose.model("CompanyAccount", CompanyAccountSchema);

module.exports = { CompanyAccountSchema, CompanyAccount };
