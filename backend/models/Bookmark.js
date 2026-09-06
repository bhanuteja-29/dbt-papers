const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

bookmarkSchema.index(
    { user: 1, questionPaper: 1 },
    { unique: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);