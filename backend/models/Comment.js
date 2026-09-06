const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        questionPaper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionPaper",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.index({
    questionPaper: 1,
    createdAt: -1,
});

module.exports = mongoose.model("Comment", commentSchema);