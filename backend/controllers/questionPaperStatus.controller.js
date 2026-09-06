const QuestionPaper = require("../models/QuestionPaper");

const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} = require("../services/file-upload.service");

const cloudinary = require("../utils/cloudinary.utils");

const questionPaperService = require("../services/questionPaper.service");

const getPendingQuestionPapers = async (req, res, next) => {
  try {
    const questionPapers = await QuestionPaper.find({
      status: "pending",
    })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: questionPapers.length,
      questionPapers,
    });
  } catch (error) {
    next(error);
  }
};

const approveQuestionPaper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findById(id);

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    if (questionPaper.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Question paper is already approved",
      });
    }

    questionPaper.status = "approved";

    // Clear previous rejection information
    questionPaper.rejectionReason = null;
    questionPaper.rejectedAt = null;

    await questionPaper.save();

    return res.status(200).json({
      success: true,
      message: "Question paper approved successfully",
      questionPaper,
    });
  } catch (error) {
    next(error);
  }
};

const rejectQuestionPaper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { reason } = req.body;

    const questionPaper = await QuestionPaper.findById(id);

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    if (questionPaper.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending question papers can be rejected",
      });
    }

    questionPaper.status = "rejected";

    questionPaper.rejectionReason =
      reason?.trim() || "No reason provided";

    questionPaper.rejectedAt = new Date();

    await questionPaper.save();

    return res.status(200).json({
      success: true,
      message: "Question paper rejected successfully",
      questionPaper,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getPendingQuestionPapers,approveQuestionPaper,rejectQuestionPaper
}