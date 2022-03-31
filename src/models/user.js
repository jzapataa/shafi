"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  avatar: String,
  created_at: String,
});

module.exports = mongoose.model("User", UserSchema);
