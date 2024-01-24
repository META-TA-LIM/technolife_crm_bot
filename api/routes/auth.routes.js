const { Router } = require("express");
const { login, me } = require("../controller/auth.controller");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/auth/login", login);
router.post("/auth/me", isAuth, me);

module.exports = router;
