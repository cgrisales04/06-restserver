const { response, request } = require("express");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const user_get = (req = request, res = response) => {
  const { q, nombre = "No name", apikey } = req.query;

  res.json({
    msg: "GET - Controller User",
    q,
    nombre,
    apikey,
  });
};

const user_post = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
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
