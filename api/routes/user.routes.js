const { Router } = require("express");
const {
  userDelete,
  userEdit,
  userGet,
  userGetOne,
  userPost,
} = require("../controller/user.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/user/create", isAuth, isAdmin, userPost);
router.get("/user/list", isAuth, userGet);
router.get("/user/:id", isAuth, userGetOne);
router.put("/user/update/:id", isAuth, isAdmin, userEdit);
router.delete("/user/delete/:id", isAuth, isAdmin, userDelete);

module.exports = router;
