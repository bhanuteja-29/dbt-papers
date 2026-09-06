const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const bookmarkController = require("../controllers/bookmark.controller");

// Add bookmark
router.post(
    "/question-papers/:id",
    authenticate,
    bookmarkController.addBookmark
);

// Remove bookmark
router.delete(
    "/question-papers/:id",
    authenticate,
    bookmarkController.removeBookmark
);

router.get(
    "/my",
    authenticate,
    bookmarkController.getMyBookmarks
);

router.get(
    "/question-papers/:id",
    authenticate,
    bookmarkController.checkBookmark
);

module.exports = router;