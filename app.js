"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var user_routes = require("./src/routes/user");
var ingresoEgreso_routes = require("./src/routes/ingreso-egreso");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", express.static("client", { redirect: false }));
app.use("/api", user_routes);
app.use("/api", ingresoEgreso_routes);

app.get("*", function (req, res, next) {
  res.sendFile(path.resolve("client/index.html"));
});

module.exports = app;
