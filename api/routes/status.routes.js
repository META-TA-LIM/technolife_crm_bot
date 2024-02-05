const { Router } = require("express");
const {
  statusDelete,
  statusEdit,
  statusGet,
  statusGetOne,
  statusPost,
  statusHide,
  statusReplace,
} = require("../controller/status.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/status/create", isAuth, isAdmin, statusPost);
router.get("/status/list", isAuth, statusGet);
router.get("/status/:id", isAuth, statusGetOne);
router.put("/status/update/:id", isAuth, isAdmin, statusEdit);
router.put("/status/hide/:id", isAuth, isAdmin, statusHide);
router.put("/status/move", isAuth, isAdmin, statusReplace);
router.delete("/status/delete/:id", isAuth, isAdmin, statusDelete);

module.exports = router;
