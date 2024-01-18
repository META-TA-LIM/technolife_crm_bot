const { Router } = require("express");
const {
  boardDelete,
  boardEdit,
  boardGet,
  boardGetOne,
  boardPost,
} = require("../controller/board.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/board/create", isAuth, isAdmin, boardPost);
router.get("/board/list", isAuth, boardGet);
router.get("/board/:id", isAuth, boardGetOne);
router.put("/board/update/:id", isAuth, isAdmin, boardEdit);
router.delete("/board/delete/:id", isAuth, isAdmin, boardDelete);

module.exports = router;
