const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido."],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("Producto", ProductoSchema);
