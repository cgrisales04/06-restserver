const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay un token en la autorización",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario || !usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido",
      });
    }
    req.user_auth = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
