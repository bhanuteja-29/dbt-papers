const mongoose = require("mongoose");

const questionPaperViewSchema = new mongoose.Schema(
  {
    questionPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
      index: true,
    },
    viewerKey: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// A viewer can contribute only one view to a given paper.
questionPaperViewSchema.index(
  { questionPaper: 1, viewerKey: 1 },
  { unique: true }
);

module.exports = mongoose.model("QuestionPaperView", questionPaperViewSchema);
