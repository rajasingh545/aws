const express = require("express");

const router = express.Router();

//Midleware countroller
const { fileUpload } = require("../controller/s3Upload");
const { download, postById } = require("../controller/s3Download");
const { getPosts } = require("../controller/posts");

router.get("/post", getPosts);
router.post("/post", fileUpload);
router.get("/post/:postId", download);
router.get("/", (req, res) => {
  return res.send("<h1>App is working.</h1>");
});

router.param("postId", postById);

module.exports = router;
