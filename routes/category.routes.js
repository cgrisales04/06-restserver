const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  category_get,
  category_get_one,
  category_post,
  category_put,
  category_delete,
} = require("../controllers/category.controller");
const { validarJWT, tieneRole } = require("../middlewares");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

router.get("/", category_get);
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  category_get_one
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido.").not().isEmpty(),
    validarCampos,
  ],
  category_post
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("nombre", "El nombre es requerido.").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  category_put
);
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  category_delete
);

module.exports = router;
