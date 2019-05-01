var mongoose = require("mongoose");

var NotificationSchema = new mongoose.Schema({});

var Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { NotificationSchema, Notification };
