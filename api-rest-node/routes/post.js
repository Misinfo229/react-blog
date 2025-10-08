/* const {Router} = require("express");
const router = Router(); */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const PostController = require("../controllers/post");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/images/');
    },
    filename: function(req, file, cb) {
        /* cb(null, "post" + Date.now() + file.originalname); */
        cb(null, file.originalname);
    }
});

const uploads = multer({storage: storage});


// Test routes
router.get("/test", PostController.test);
router.get("/course", PostController.course);

router.post("/create", PostController.createPost);
router.get("/posts/:last", PostController.getPosts);
router.get("/posts", PostController.getPosts);
router.get("/post/:id", PostController.getPost);
router.delete("/post/:id", PostController.deletePost);
router.put("/post/:id", uploads.none(), PostController.editPost);
router.post("/upload-image/:id", [uploads.single("file")], PostController.uploadImage);
router.get("/image/:file", PostController.featuredImage);
router.get("/search/:search", PostController.searcher);




module.exports = router;