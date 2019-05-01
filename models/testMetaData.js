var mongoose = require("mongoose");

var TestMetaDataSchema = new mongoose.Schema({
  test: { type: mongoose.SchemaTypes.ObjectId, ref: "Test" },
  passScore: Number,
  whoCreated: { type: mongoose.SchemaTypes.ObjectId, ref: "CompanyAccount" }
});

var TestMetaData = mongoose.model("TestMetaData", TestMetaDataSchema);

module.exports = { TestMetaDataSchema, TestMetaData };

/*
  passScore -> testi geçme score'u
*/
