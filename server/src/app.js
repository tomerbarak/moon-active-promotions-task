const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes");
const session = require("express-session");
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const env = process.env.NODE_ENV || "development";

const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/moonactive";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(uri, options)
  .catch(() => console.error.bind(console, "MongoDB connection error:"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(
  session({
    secret: "thisisasecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(function (req, res, next) {
  const allowedOrigins = ["http://127.0.0.1:3000", "http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

process.on("uncaughtException", function (error) {
  console.error("Error: " + error.message, error.stack);
});

router(app);

const port = "8000";
app.listen(port);

module.exports = app;
