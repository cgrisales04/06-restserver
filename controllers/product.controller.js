const { request, response } = require("express");
const { Producto } = require("../models");

const get_product = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const where = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(where),
    Producto.find(where)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);
  res.json({
    total,
    productos,
  });
};

const product_get_one = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById({ _id: id })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  return res.json({
    producto,
  });
};

const product_post = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { categoria, precio = 0, descripcion = "" } = req.body;

  const validarExistencia = Producto.find({ nombre });
  if (!validarExistencia) {
    return res.status(400).json({
      msg: `Producto ${nombre} ya se encuentra registrado`,
    });
  }
  const data = {
    nombre,
    precio,
    descripcion,
    categoria,
    usuario: req.user_auth._id,
  };

  const producto = new Producto(data);
  await producto.save();

  return res.status(201).json(data);
};

const product_put = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  resto.nombre = resto.nombre.toUpperCase();
  resto.usuario = req.user_auth._id;
  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.json(producto);
};

const product_delete = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    producto,
  });
};

module.exports = {
  get_product,
  product_get_one,
  product_post,
  product_put,
  product_delete,
};
