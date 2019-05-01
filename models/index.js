// export { CandidateAccount, CandidateAccountSchema } from "./candidateAccount";
// export { Notification, NotificationSchema } from "./notification";
// export { Experience, ExperienceSchema } from "./experience";
// export { Position, PositionSchema } from "./position";
// export { Company, CompanySchema } from "./company";
// export { CompanyAccount, CompanyAccountSchema } from "./companyAccount";
// export { Test, TestSchema } from "./test";
// export { TestResult, TestResultSchema } from "./testResult";

// import { Aday, AdaySchema } from "./aday";
// import { Bildirim, BildirimSchema } from "./bildirim";
// import { Deneyim, DeneyimSchema } from "./deneyim";
// import { Pozisyon, PozisyonSchema } from "./pozisyon";
// import { Şirket, ŞirketSchema } from "./şirket";
// import { Test, TestSchema } from "./test";
// import { TestSonucu, TestSonucuSchema } from "./testSonucu";
//
// console.log(TestSonucuSchema);
// export {
//   Aday,
//   AdaySchema,
//   Bildirim,
//   BildirimSchema,
//   Deneyim,
//   DeneyimSchema,
//   Pozisyon,
//   PozisyonSchema,
//   Şirket,
//   ŞirketSchema,
//   Test,
//   TestSchema,
//   TestSonucu,
//   TestSonucuSchema
// };

var path = require("path"),
  dir = require("fs").readdirSync(__dirname + path.sep);

dir.forEach(function(filename) {
  if (path.extname(filename) === ".js" && filename !== "index.js") {
    var exportAsName = path.basename(filename);
    module.exports[exportAsName] = require(path.join(__dirname, filename));
  }
});
