const { Router } = require("express");
const {
  groupDelete,
  groupEdit,
  groupGet,
  groupGetByTitle,
  groupGetDropDown,
  groupGetOne,
  groupPost,
  groupUserDelete,
} = require("../controller/group.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/group/create", isAuth, isAdmin, groupPost);
router.get("/group/list", isAuth, groupGet);
router.get("/group/:id", isAuth, groupGetOne);
router.get("/group/title", isAuth, groupGetByTitle);
router.get("/group/drop-down/list", isAuth, groupGetDropDown);
router.put("/group/update/:id", isAuth, isAdmin, groupEdit);
router.delete("/group/delete/:id", isAuth, isAdmin, groupDelete);
router.delete("/group/delete-learner", isAuth, isAdmin, groupUserDelete);

module.exports = router;
