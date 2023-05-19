const { response, request } = require("express");
const Usuario = require("../models/usuario");

const user_get = (req = request, res = response) => {
  const { q, nombre = "No name", apikey } = req.query;

  res.json({
    msg: "GET - Controller User",
    q,
    nombre,
    apikey,
  });
};

const user_post = (req = request, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);

  res.json({
    msg: "POST - Controller User",
    usuario,
  });
};

const user_put = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "PUT - Controller User",
    id,
  });
};

const user_delete = (req, res = response) => {
  res.json({
    msg: "DELETE - Controller User",
  });
};

const user_patch = (req, res = response) => {
  res.json({
    msg: "PATCH - Controller User",
  });
};

module.exports = {
  user_get,
  user_put,
  user_post,
  user_delete,
  user_patch,
};
