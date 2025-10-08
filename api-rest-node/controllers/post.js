const Post = require("../models/Post");
const { validatePost } = require("../helpers/validate");
const fs = require("fs").promises;
const path = require("path");

const test = (req, res) => {
    return res.status(200).json({
        message: "Controller testing"
    });
}

const course = (req, res) => {
    return res.status(200).json([{
        course: "Master React",
        autor: "MC"
    }]);
}

const createPost = async (req, res) => {
    // Collect post parameters
    let params;
    try {
        params = req.body;
        // Validation
        validatePost(params);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            error: error.message
        });
    }
    // Create and save post
    try {
        // const post = new Post(params);
        const post = new Post({
            ...params,
            image: params.image || "default.png" // Use default image
        });
        const postCreated = await post.save();

        return res.status(200).json({
            status: "success",
            post: postCreated,
            message: "Post created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Post not created",
            error: error.message
        });
    }
}
// Get posts with exec
/* const getPosts = (req, res) => {
    let query = Post.find({}).exec((error, posts) => {
        if(error || !posts){
            return res.status(400).json({
                status: "error",
                message: "Posts not found"
            });
        }
        return res.status(200).send({
            status: "success",
            posts
        })
    });
} */

// Get posts with async/await
const getPosts = async (req, res) => {
    try {
        const last = req.params.last;

        let query = Post.find({}).sort({ date: -1 });

        if (last && !isNaN(last)) {
            query = query.limit(parseInt(last));
        }

        const posts = await query;

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No posts found"
            });
        }

        return res.status(200).json({
            status: "success",
            url_params: last,
            posts
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error fetching posts",
            error: error.message
        });
    }
}

const getPost = async (req, res) => {

    let id = req.params.id;

    try {
        let post = await Post.findById(id);

        return res.status(200).json({
            status: "success",
            post
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error fetching post",
            error: error.message
        });
    }
}
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        let post = await Post.findById(id);
        await Post.findOneAndDelete({ _id: id });

        if (!post) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        }

        // Delete image if it's not the default
        if (post.image && post.image !== "default.png") {
            const imagePath = path.join(__dirname, "../src/images/", post.image);
            try {
                await fs.unlink(imagePath);
                console.log("Image deleted:", post.image);
            } catch (err) {
                console.warn("Error deleting image:", err.message);
            }
        }

        return res.status(200).json({
            status: "success",
            message: "Post deleted",
            post
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error deleting post",
            error: error.message
        });
    }
};

const editPost = async (req, res) => {
    let id = req.params.id;
    let params = req.body;

    try {
        validatePost(params);

        let updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            params,
            { new: true } // Esto devuelve el documento ya actualizado
        );

        if (!updatedPost) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        } else {
            return res.status(200).json({
                status: "success",
                post: updatedPost
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error editing post",
            error: error.message
        });
    }
}

const uploadImage = async (req, res) => {
    if (!req.file && !req.files) {
        return res.status(400).json({
            status: "error",
            message: "No file uploaded"
        });
    }
    /*} else {
        try {
             let file = req.file.originalname;
            let file_split = file.split("\.");
            let extension = file_split[1];
 
            /* if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") { */
    /*if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
        await fs.unlink(req.file.path);
        return res.status(400).json({
            status: "error",
            message: "Invalid image format"
        });
 
    } */
    // File name
    let fileName = req.file.filename;
    // Post ID
    let postId = req.params.id;

    const post = await Post.findById(postId);

    // Delete old image if it's not default
    if (post.image && post.image !== "default.png") {
        const oldImagePath = path.join(__dirname, "../src/images/", post.image);
        try {
            await fs.unlink(oldImagePath);
            console.log("Old image deleted:", post.image);
        } catch (err) {
            console.warn("Could not delete old image:", post.image);
        }
    }

    // Update post with new image
    try {
        let updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            { image: fileName },
            { new: true } // Esto devuelve el documento ya actualizado
        );

        /* if (!updatedPost) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        } */
        return res.status(200).json({
            status: "success",
            post: updatedPost,
            files: req.file
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error uploading image",
            error: error.message
        });
    }
}

const featuredImage = async (req, res) => {
    try {
        let file = req.params.file;
        let filePath = path.resolve("./src/images/" + file);

        // Check if the file exists
        await fs.access(filePath);

        return res.sendFile(filePath);
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: "Image doesn't exist"
        });
    }
}

const searcher = async (req, res) => {
    let search = req.params.search;
    /* Post.
        find({
            "$or": [
                { "title": { "$regex": search, "$options": "i" } }
        { "content": { "$regex": search, "$options": "i" } }
            ]
        })
        .sort({ date: -1 })
        .exec(error, posts); */

    try {
        let searchResult = await Post.
            find({
                "$or": [
                    { "title": { "$regex": search, "$options": "i" } },
                    { "content": { "$regex": search, "$options": "i" } }
                ]
            })
            .sort({ date: -1 });

        if (!searchResult || searchResult.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Posts not found"
            })
        }
        return res.status(200).json({
            status: "success",
            posts: searchResult
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error searching",
            error: error.message
        });
    }
}

module.exports = {
    test,
    course,
    createPost,
    getPosts,
    getPost,
    deletePost,
    editPost,
    uploadImage,
    featuredImage,
    searcher
}