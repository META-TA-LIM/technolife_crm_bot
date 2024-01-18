const { Router } = require("express");
const {
  roleDelete,
  roleEdit,
  roleGet,
  roleGetByTitle,
  roleGetDropDown,
  roleGetOne,
  rolePost,
} = require("../controller/role.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/auth/role/create", isAuth, isAdmin, rolePost);
router.get("/auth/role/list", isAuth, roleGet);
router.get("/auth/role/:id", isAuth, roleGetOne);
router.get("/auth/role/title", isAuth, roleGetByTitle);
router.get("/auth/role/drop-down/list", isAuth, roleGetDropDown);
router.put("/auth/role/update/:id", isAuth, isAdmin, roleEdit);
router.delete("/auth/role/delete/:id", isAuth, isAdmin, roleDelete);

module.exports = router;
