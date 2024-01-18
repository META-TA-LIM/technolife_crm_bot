const { Router } = require("express");
const {
  employeeDelete,
  employeeEdit,
  employeeGet,
  employeeGetByName,
  employeeGetDropDown,
  employeeGetOne,
  employeePost,
  employeeEditPassword,
} = require("../controller/employee.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/employee/create", isAuth, isAdmin, employeePost);
router.get("/employee/list", isAuth, employeeGet);
router.get("/employee/:id", isAuth, employeeGetOne);
router.get("/employee/name", isAuth, employeeGetByName);
router.get("/employee/drop-down/list", isAuth, employeeGetDropDown);
router.put("/employee/update/:id", isAuth, isAdmin, employeeEdit);
router.put(
  "/employee/update-password/:id",
  isAuth,
  isAdmin,
  employeeEditPassword
);
router.delete("/employee/delete/:id", isAuth, isAdmin, employeeDelete);

module.exports = router;
