const { Router } = require("express");
const {
  courseDelete,
  courseEdit,
  courseGet,
  courseGetByTitle,
  courseGetDropDown,
  courseGetOne,
  coursePost,
} = require("../controller/course.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/course/create", isAuth, isAdmin, coursePost);
router.get("/course/list", isAuth, courseGet);
router.get("/course/:id", isAuth, courseGetOne);
router.get("/course/title", isAuth, courseGetByTitle);
router.get("/course/drop-down/list", isAuth, courseGetDropDown);
router.put("/course/update/:id", isAuth, isAdmin, courseEdit);
router.delete("/course/delete/:id", isAuth, isAdmin, courseDelete);

module.exports = router;
