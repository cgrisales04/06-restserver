const { Router } = require("express");
const {
  user_get,
  user_put,
  user_post,
  user_delete,
  user_patch,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", user_get);
router.put("/:id", user_put);
router.post("/", user_post);
router.delete("/", user_delete);
router.patch("/", user_patch);

module.exports = router;
