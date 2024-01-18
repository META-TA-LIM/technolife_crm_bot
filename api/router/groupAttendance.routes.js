const { Router } = require("express");
const {
  groupAttendanceDelete,
  groupAttendanceEdit,
  groupAttendanceGet,
  groupAttendancePost,
} = require("../controller/groupAttendance.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post(
  "/group-attendance/:groupID/create",
  isAuth,
  isAdmin,
  groupAttendancePost
);
router.get("/group-attendance/:groupID/list", isAuth, groupAttendanceGet);
router.put(
  "/group-attendance/:groupID/update/:id",
  isAuth,
  isAdmin,
  groupAttendanceEdit
);
router.delete(
  "/group-attendance/:groupID/delete/:id",
  isAuth,
  isAdmin,
  groupAttendanceDelete
);

module.exports = router;
