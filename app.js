var createError = require("http-errors");
var express = require("express");
var http = require("http");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
var upload = multer();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var corsOptions = {
  origin: true, //"https://headports-api-deneme.furiousx29.now.sh"
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var app = express();

// Connect to MongoDB
var db = mongoose
  .connect(
    "mongodb://celal:demir@headports-shard-00-00-tpcok.mongodb.net:27017,headports-shard-00-01-tpcok.mongodb.net:27017,headports-shard-00-02-tpcok.mongodb.net:27017/test?ssl=true&replicaSet=HeadPorts-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database \n" + err);
    }
  );
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(upload.none());

// parse application/json
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: err.status, message: err.message });
});

const PORT = process.env.PORT || 3000;

var httpServer = http.createServer(app);

httpServer.listen(PORT, function() {
  var host = httpServer.address().address;
  var port = httpServer.address().port;
  console.log("Node app listening at http://%s:%s", host, port);
});

module.exports = app;
