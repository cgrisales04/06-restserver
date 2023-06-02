const { Router } = require("express");
const { check } = require("express-validator");
const {
  get_product,
  product_get_one,
  product_post,
  product_put,
  product_delete,
} = require("../controllers/product.controller");
const { validarCampos, validarJWT, tieneRole } = require("../middlewares");
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("", get_product);
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  product_get_one
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("categoria", "La categoria es requerida").not().isEmpty(),
    check("categoria", "No es un ID Válido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  product_post
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    check("nombre", "El nombre es requerido.").not().isEmpty(),
    check("categoria", "La categoria es requerida").not().isEmpty(),
    check("categoria").custom(existeCategoriaPorId),
    check("categoria", "No es un ID Válido").isMongoId(),
    validarCampos,
  ],
  product_put
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  product_delete
);

module.exports = router;
