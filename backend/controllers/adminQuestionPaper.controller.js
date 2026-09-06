const QuestionPaper = require("../models/QuestionPaper");

const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} = require("../services/file-upload.service");

const cloudinary = require("../utils/cloudinary.utils");

const questionPaperService = require("../services/questionPaper.service");


const deleteQuestionPaper = async (req, res) => {
  try {
    const result =
      await questionPaperService.deleteQuestionPaper(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error(
      "DELETE QUESTION PAPER ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminManagedQuestionPapers = async (
  req,
  res,
  next
) => {
  try {
    const {
      status,
      page = 1,
      limit = 10,
    } = req.query;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be either approved or rejected",
      });
    }

    const result =
      await questionPaperService.getAdminManagedQuestionPapers({
        status,
        page,
        limit,
      });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    deleteQuestionPaper,getAdminManagedQuestionPapers
}