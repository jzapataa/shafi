"use strict";

var User = require("../models/user");

var controller = {
  save: function (req, res) {
    var params = req.body;

    try {
      var validate_name = !validator.isEmpty(params.name);
      var validate_surname = !validator.isEmpty(params.surname);
      var validate_email =
        !validator.isEmpty(params.email) && validator.isEmail(params.email);
      var validate_password = !validator.isEmpty(params.password);
    } catch (err) {
      return res.status(200).send({
        message: "Faltan datos por enviar",
      });
    }

    if (
      validate_email &&
      validate_password &&
      validate_name &&
      validate_surname
    ) {
      var user = new User();
    }
  },
};
