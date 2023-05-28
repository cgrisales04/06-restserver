const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.user_auth) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  const { rol, nombre } = req.user_auth;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no tienes el rol para eliminar el usuario, comunicate con el administrador.`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user_auth) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }
    if (!roles.includes(req.user_auth.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
