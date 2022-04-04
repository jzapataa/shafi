"use strict";

var moment = require("moment");
var IngresoEgreso = require("../models/ingreso-egreso");

function addIngresoEgreso(req, res) {
  var params = req.body;

  if (params.description && params.amount && params.type && params.category) {
    var ingresoEgreso = new IngresoEgreso();
    ingresoEgreso.description = params.description;
    ingresoEgreso.amount = params.amount;
    ingresoEgreso.type = params.type;
    ingresoEgreso.category = params.category;
    ingresoEgreso.date = params.date;
    ingresoEgreso.user = req.user.sub;

    ingresoEgreso.save((err, ingresoEgresoStorage) => {
      if (err) {
        return res.status(500).send({
          message: "Error al guardar el Ingreso/Egreso.",
        });
      }

      if (!ingresoEgresoStorage) {
        return res.status(400).send({
          message: "El Ingreso/Egreso no se ha podido guardar.",
        });
      }

      return res.status(200).send({
        status: "success",
        ingresoEgreso: ingresoEgresoStorage,
      });
    });
  } else {
    return res.status(200).send({
      message:
        "validacion de los datos del Ingreso/Egreso incorrectos, intentalo de nuevo",
    });
  }
}

function getIngresoEgreso(req, res) {
  IngresoEgreso.find({}, (err, ingresoEgreso) => {
    if (err) {
      return res.status(500).send({
        message: "Error al hacer la consulta",
      });
    }

    if (!ingresoEgreso) {
      return res.status(404).send({
        message: "No hay Ingresos/Egresos",
      });
    }

    return res.status(200).send({
      status: "success",
      ingresoEgreso: ingresoEgreso,
    });
  });
}

function deleteIngresoEgreso(req, res) {
  var id = req.params.id;

  IngresoEgreso.findByIdAndRemove(id, (err, ingresoEgresoRemoved) => {
    if (err) {
      return res.status(500).send({
        message: "No se ha podido borrar el Ingreso/Egreso",
      });
    }

    if (!ingresoEgresoRemoved) {
      return res.status(404).send({
        message: "No se puede eliminar ese Ingreso/Egreso",
      });
    }

    return res.status(200).send({
      ingresoEgresoRemoved,
    });
  });
}

module.exports = {
  addIngresoEgreso,
  getIngresoEgreso,
  deleteIngresoEgreso,
};
