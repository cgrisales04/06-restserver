const { Router } = require("express");
const { check } = require("express-validator");
const {
  user_get,
  user_put,
  user_post,
  user_delete,
  user_patch,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, existeEmail } = require("../helpers/db-validators");

const router = Router();

router.get("/", user_get);
router.put("/:id", user_put);
router.post(
  "/",
  [
    check("nombre", "El nombre no es válido.").not().isEmpty(),
    check("password", "El password debe de contener 6 caracteres.").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido.").isEmail(),
    check("correo").custom(existeEmail),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  user_post
);
router.delete("/", user_delete);
router.patch("/", user_patch);

module.exports = router;
