const Rating = require("../models/Rating");
const QuestionPaper = require("../models/QuestionPaper");

const rateQuestionPaper = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const questionPaper = await QuestionPaper.findOne({
            _id: id,
            status: "approved",
        });

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        const existingRating = await Rating.findOne({
            user: req.user.sub,
            questionPaper: id,
        });

        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
        } else {
            await Rating.create({
                user: req.user.sub,
                questionPaper: id,
                rating,
            });
        }

        // Get all ratings for this paper
        const ratings = await Rating.find({
            questionPaper: id,
        }).select("rating");

        const ratingCount = ratings.length;

        const totalRating = ratings.reduce(
            (sum, item) => sum + item.rating,
            0
        );

        const averageRating =
            ratingCount > 0
                ? Number((totalRating / ratingCount).toFixed(2))
                : 0;

        // Update QuestionPaper summary
        questionPaper.averageRating = averageRating;
        questionPaper.ratingCount = ratingCount;

        await questionPaper.save();

        return res.status(200).json({
            success: true,
            message: existingRating
                ? "Rating updated successfully"
                : "Rating submitted successfully",
            averageRating,
            ratingCount,
        });
    } catch (error) {
        next(error);
    }
};

const getMyRating = async (req, res, next) => {
    try {
        const { id } = req.params;

        const questionPaper = await QuestionPaper.findOne({
            _id: id,
            status: "approved",
        });

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        const rating = await Rating.findOne({
            user: req.user.sub,
            questionPaper: id,
        }).select("rating");

        return res.status(200).json({
            success: true,
            rating: rating ? rating.rating : null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    rateQuestionPaper,getMyRating
};