var mongoose = require("mongoose");

var PositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  finishDate: {
    type: Date,
    required: true
  },
  wage: {
    type: Number,
    required: false
  },
  workType: {
    type: String,
    required: true
  },
  HRStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyAccount"
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  testMetaDatas: [{ type: mongoose.SchemaTypes.ObjectId, ref: "TestMetaData" }]
});

var Position = mongoose.model("Position", PositionSchema);

module.exports = { PositionSchema, Position };
