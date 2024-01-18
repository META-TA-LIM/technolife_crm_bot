const { Router } = require("express");
const {
  uploadDoc,
  uploadImage,
  uploadImageUrl,
} = require("../controller/minio.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuth = require("../middlewares/isAuth.middleware");

const router = new Router();

router.post("/minio/upload-doc", isAuth, isAdmin, uploadDoc);
router.post("/minio/upload-image", isAuth, isAdmin, uploadImage);
router.post("/minio/upload-url", isAuth, isAdmin, uploadImageUrl);

module.exports = router;
