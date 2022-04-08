"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/shafi", { useNewUrlParser: true })
  .then(() => {
    console.log("La conexión a la BBDD se ha realizado correctamente");

    app.listen(port, () => {
      console.log("Servidor corriendo en http://165.227.130.7:3700");
    });
  });
