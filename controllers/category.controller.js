const { request, response } = require("express");

const { Categoria, Usuario } = require("../models");

const category_get = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const where = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(where),
    Categoria.find(where)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);

  res.json({ total, categorias });
};

const category_get_one = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById({ _id: id }).populate(
    "usuario",
    "nombre"
  );

  return res.json({
    categoria,
  });
};

const category_post = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const findCategory = await Categoria.findOne({ nombre });

  if (findCategory) {
    return res.status(400).json({
      msg: `Categoria ${nombre} existente.`,
    });
  }

  const data = {
    nombre,
    usuario: req.user_auth._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

const category_put = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.user_auth._id;
  const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

  res.json(categoria);
};

const category_delete = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    categoria,
  });
};

module.exports = {
  category_get,
  category_get_one,
  category_post,
  category_put,
  category_delete,
};
