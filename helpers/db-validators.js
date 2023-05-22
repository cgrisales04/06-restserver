const Role = require("../models/rol");
const Usuario = require("../models/usuario");

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

module.exports = {
  esRoleValido,
  existeEmail,
};