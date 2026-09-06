const QuestionPaper = require("../../models/QuestionPaper");
const getQuestionPaperStats = async (req, res, next) => {
  try {
    const [
      total,
      pending,
      approved,
      rejected,
    ] = await Promise.all([
      QuestionPaper.countDocuments(),

      QuestionPaper.countDocuments({
        status: "pending",
      }),

      QuestionPaper.countDocuments({
        status: "approved",
      }),

      QuestionPaper.countDocuments({
        status: "rejected",
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getQuestionPaperStats}