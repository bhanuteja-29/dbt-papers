const QuestionPaper = require("../../models/QuestionPaper");



const getQuestionPaperById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const questionPaper =
      await QuestionPaper.findOneAndUpdate(
        {
          _id: id,
          status: "approved",
        },
        {
          $inc: { views: 1 },
        },
        {
          new: true,
        }
      ).populate("uploadedBy", "name");

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    return res.status(200).json({
      success: true,
      questionPaper,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getQuestionPaperById}