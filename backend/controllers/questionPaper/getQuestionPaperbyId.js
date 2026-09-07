const QuestionPaper = require("../../models/QuestionPaper");
const QuestionPaperView = require("../../models/QuestionPaperView");



const getQuestionPaperById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const questionPaper = await QuestionPaper.findOne({
      _id: id,
      status: "approved",
    }).populate("uploadedBy", "name");

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    const visitorId = req.get("X-Visitor-Id");
    const viewerKey = req.user?.sub
      ? `user:${req.user.sub}`
      : visitorId
        ? `visitor:${visitorId}`
        : null;

    if (viewerKey && viewerKey.length <= 100) {
      try {
        await QuestionPaperView.create({
          questionPaper: questionPaper._id,
          viewerKey,
        });

        await QuestionPaper.updateOne(
          { _id: questionPaper._id },
          { $inc: { views: 1 } }
        );
        questionPaper.views += 1;
      } catch (error) {
        // A duplicate-key error means this viewer has already been counted.
        if (error.code !== 11000) {
          throw error;
        }
      }
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
