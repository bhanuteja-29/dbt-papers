const Comment = require("../models/Comment");
const QuestionPaper = require("../models/QuestionPaper");

const createComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

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

        // Create the comment
        const comment = await Comment.create({
            user: req.user.sub,
            questionPaper: id,
            content,
        });

        // Return the comment with the user's name
        await comment.populate("user", "name email");

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        next(error);
    }
};

const getComments = async (req, res, next) => {
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

        // Pagination
        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 10, 1),
            50
        );

        const skip = (page - 1) * limit;

        // Get comments and total count
        const [comments, total] = await Promise.all([
            Comment.find({
                questionPaper: id,
            })
                .populate("user", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Comment.countDocuments({
                questionPaper: id,
            }),
        ]);

        return res.status(200).json({
            success: true,
            comments,
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

const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Only the comment owner can edit it
        if (comment.user.toString() !== req.user.sub) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own comments",
            });
        }

        comment.content = content;

        await comment.save();

        await comment.populate("user", "name");

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        const isOwner = comment.user.toString() === req.user.sub;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this comment",
            });
        }

        await Comment.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
};