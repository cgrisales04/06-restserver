const { response, request } = require("express");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const user_get = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const where = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(where),
    Usuario.find(where).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
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

const user_put = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json(usuario);
};

const user_delete = async (req, res = response) => {
  const { id } = req.params;
  const userDisabled = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    userDisabled,
  });
};

module.exports = {
  user_get,
  user_put,
  user_post,
  user_delete,
};
