const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const { ratingValidator } = require("../validators/rating.validators");

const ratingController = require("../controllers/rating.controller");

router.post(
    "/question-papers/:id",
    authenticate,
    validationMiddleware(ratingValidator),
    ratingController.rateQuestionPaper
);
router.get(
    "/question-papers/:id",
    authenticate,
    ratingController.getMyRating
);

module.exports = router;