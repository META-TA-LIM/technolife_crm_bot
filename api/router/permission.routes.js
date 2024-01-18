const { Router } = require("express");
const {
  permissionDelete,
  permissionEdit,
  permissionGet,
  permissionGetOne,
  permissionPost,
} = require("../controller/permission.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/auth/permission/create", isAuth, isAdmin, permissionPost);
router.get("/auth/permission/list", isAuth, permissionGet);
router.get("/auth/permission/:id", isAuth, permissionGetOne);
router.put("/auth/permission/update/:id", isAuth, isAdmin, permissionEdit);
router.delete("/auth/permission/delete/:id", isAuth, isAdmin, permissionDelete);

module.exports = router;
