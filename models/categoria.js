const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

module.exports = model("Categoria", CategorySchema);
