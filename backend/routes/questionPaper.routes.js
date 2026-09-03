const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const upload = require("../middleware/upload.middleware");

const questionPaperController = require("../controllers/questionPaper.controller");


router.get(
    "/pending",
    authenticate,
    authorize("admin"),
    questionPaperController.getPendingQuestionPapers
);

router.patch(
    "/:id/approve",
    authenticate,
    authorize("admin"),
    questionPaperController.approveQuestionPaper
);


router.patch(
    "/:id/reject",
    authenticate,
    authorize("admin"),
    questionPaperController.rejectQuestionPaper
);

router.get(
    "/",
    questionPaperController.getQuestionPapers
);

router.get(
    "/:id/download",
    questionPaperController.downloadQuestionPaper
);

router.post(
    "/",
    authenticate,
    upload.single("file"),
    questionPaperController.createQuestionPaper
);

router.get(
    "/:id",
    questionPaperController.getQuestionPaperById
);





module.exports = router;