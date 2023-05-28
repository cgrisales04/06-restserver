const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario || !usuario.estado) {
      return res.status(400).json({
        msg: "Usuario y/o password son incorrectos",
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario y/o password son incorrectos",
      });
    }
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo ocurrio mal, porfavor comunicate con el administrador",
    });
  }
};

module.exports = {
  login,
};
