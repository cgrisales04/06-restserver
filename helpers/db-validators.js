const Role = require("../models/rol");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD.`);
  }
};

const existeEmail = async (correo = "") => {
  const buscarEmail = await Usuario.findOne({ correo });
  if (buscarEmail) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const buscarUsuarioId = await Usuario.findById(id);
  if (!buscarUsuarioId) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeCategoriaPorId = async (id = "") => {
  const buscarCategoriaId = await Categoria.findById(id);
  if (!buscarCategoriaId) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeProductoPorId = async (id = "") => {
  const buscarProductoId = await Producto.findById(id);
  if (!buscarProductoId) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
