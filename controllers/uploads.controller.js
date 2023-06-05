const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ msg: "No se encontraron archivos que subir" });
  }
  try {
    const nombre = await subirArchivo(req.files);
    res.json({
      nombre,
    });
    
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

module.exports = {
  cargarArchivo,
};
