const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const { commentValidator } = require("../validators/comment.validators");

const commentController = require("../controllers/comment.controller");

router.post(
    "/question-papers/:id",
    authenticate,
    validationMiddleware(commentValidator),
    commentController.createComment
);

router.get(
    "/question-papers/:id",
    commentController.getComments
);

router.patch(
    "/:id",
    authenticate,
    validationMiddleware(commentValidator),
    commentController.updateComment
);

router.delete(
    "/:id",
    authenticate,
    commentController.deleteComment
);

module.exports = router;