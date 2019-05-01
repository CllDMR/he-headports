var mongoose = require("mongoose");

var CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  positions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Position", required: false }
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      required: false
    }
  ],
  address: {
    type: String,
    required: true
  },
  companyUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyAccount",
      required: false
    }
  ]
});

var Company = mongoose.model("Company", CompanySchema);

module.exports = { CompanySchema, Company };
