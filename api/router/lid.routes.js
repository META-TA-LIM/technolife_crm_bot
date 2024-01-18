const { Router } = require("express");
const {
  lidDelete,
  lidEdit,
  lidGet,
  lidGetOne,
  lidPost,
  lidReplace,
} = require("../controller/lid.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/lid/create", isAuth, isAdmin, lidPost);
router.get("/lid/list", isAuth, lidGet);
router.get("/lid/:id", isAuth, lidGetOne);
router.put("/lid/update/:id", isAuth, isAdmin, lidEdit);
router.put("/lid/move/:id", isAuth, isAdmin, lidReplace);
router.delete("/lid/delete/:id", isAuth, isAdmin, lidDelete);

module.exports = router;
