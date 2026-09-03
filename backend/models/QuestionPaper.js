const mongoose = require("mongoose");

const questionPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    courseCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    examType: {
      type: String,
      required: true,
      trim: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    filePublicId: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    processingStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    downloads: {
      type: Number,
      default: 0,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tags: {
      type: [String],
      default: [],
    },
    
  },
  {
    timestamps: true,
  },
);

questionPaperSchema.index({
  course: 1,
  courseCode: 1,
  academicYear: 1,
  examType: 1,
});

questionPaperSchema.index({
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
