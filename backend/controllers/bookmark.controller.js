const Bookmark = require("../models/Bookmark");
const QuestionPaper = require("../models/QuestionPaper");

const addBookmark = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check whether the paper exists and is approved
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

        // Check whether the user already bookmarked this paper
        const existingBookmark = await Bookmark.findOne({
            user: req.user.sub,
            questionPaper: id,
        });

        if (existingBookmark) {
            return res.status(409).json({
                success: false,
                message: "Question paper already bookmarked",
            });
        }

        const bookmark = await Bookmark.create({
            user: req.user.sub,
            questionPaper: id,
        });

        return res.status(201).json({
            success: true,
            message: "Question paper bookmarked successfully",
            bookmark,
        });
    } catch (error) {
        next(error);
    }
};

const removeBookmark = async (req, res, next) => {
    try {
        const { id } = req.params;

        const bookmark = await Bookmark.findOneAndDelete({
            user: req.user.sub,
            questionPaper: id,
        });

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bookmark removed successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getMyBookmarks = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 10, 1),
            50
        );

        const skip = (page - 1) * limit;

        const [bookmarks, total] = await Promise.all([
            Bookmark.find({
                user: req.user.sub,
            })
                .populate({
                    path: "questionPaper",
                    match: { status: "approved" },
                    select: "title course courseCode academicYear examType files views downloads averageRating ratingCount",
                })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Bookmark.countDocuments({
                user: req.user.sub,
            }),
        ]);

        // Remove bookmarks whose papers are no longer approved
        const validBookmarks = bookmarks.filter(
            (bookmark) => bookmark.questionPaper !== null
        );

        return res.status(200).json({
            success: true,
            bookmarks: validBookmarks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};


const checkBookmark = async (req, res, next) => {
    try {
        const { id } = req.params;

        const bookmark = await Bookmark.findOne({
            user: req.user.sub,
            questionPaper: id,
        });

        return res.status(200).json({
            success: true,
            bookmarked: !!bookmark,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addBookmark,
    removeBookmark,
    getMyBookmarks,
    checkBookmark,
};