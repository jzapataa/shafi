"use strict";

var express = require("express");
var IngresoEgresoController = require("../controllers/ingreso-egreso");
var md_auth = require("../middlewares/authenticated");

var router = express.Router();

router.post(
  "/add-ingreso-egreso",
  md_auth.authenticated,
  IngresoEgresoController.addIngresoEgreso
);
router.get(
  "/get-ingreso-egreso",
  md_auth.authenticated,
  IngresoEgresoController.getIngresoEgreso
);

module.exports = router;
