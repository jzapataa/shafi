"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IngresoEgresoSchema = Schema({
  description: String,
  amount: Number,
  type: String,
  category: String,
  date: Date,
  user: String,
});

module.exports = mongoose.model("IngresoEgreso", IngresoEgresoSchema);
