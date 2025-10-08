const validator = require("validator");

const validatePost = (params) => {

    let validate_title =
        !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 5, max: 100 });
    let validate_content = !validator.isEmpty(params.content);
    let validate_category = !validator.isEmpty(params.category);

    if (!validate_title) {
        throw new Error("Title must be between 5 and 100 characters.");
    }
    if (!validate_content) {
        throw new Error("Content cannot be empty.");
    }
    if (!validate_category) {
        throw new Error("You must select a category.");
    }
}

module.exports = {
    validatePost
}