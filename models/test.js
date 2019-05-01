var mongoose = require("mongoose");

var TestSchema = new mongoose.Schema({
  questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Question" }],
  testName: String,
  categoryName: String,
  estimatedFinishingTime: String
});

var Test = mongoose.model("Test", TestSchema);

module.exports = { TestSchema, Test };

// estimatedFinihingTime => String ????
// Büyük ihtimalle constants js yapıp "${number} ${unit}" (exp. 5 minutes) şeklinde saklayıp moment ile şuanki zamanına ekleme yaparım
// ama şuanki zaman nedir ? hangi durumlarda yenilenmeli? kim tarafından belirlenmeli (server - client)
