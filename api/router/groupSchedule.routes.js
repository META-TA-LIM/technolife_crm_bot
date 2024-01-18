const { Router } = require("express");
const {
  groupScheduleDelete,
  groupScheduleEdit,
  groupScheduleGet,
  groupSchedulePost,
} = require("../controller/groupSchedule.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post(
  "/group-schedule/:groupID/create",
  isAuth,
  isAdmin,
  groupSchedulePost
);
router.get("/group-schedule/:groupID/list", isAuth, groupScheduleGet);
router.put(
  "/group-schedule/:groupID/update/:id",
  isAuth,
  isAdmin,
  groupScheduleEdit
);
router.delete(
  "/group-schedule/:groupID/delete/:id",
  isAuth,
  isAdmin,
  groupScheduleDelete
);

module.exports = router;
