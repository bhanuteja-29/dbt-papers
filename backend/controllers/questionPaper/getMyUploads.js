const QuestionPaper = require("../../models/QuestionPaper");



const getMyUploads = async (req, res, next) => {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const userFilter = {
      uploadedBy: req.user.sub,
    };

    const [
      questionPapers,
      total,
      pending,
      approved,
      rejected,
    ] = await Promise.all([
      QuestionPaper.find(userFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      QuestionPaper.countDocuments(userFilter),

      QuestionPaper.countDocuments({
        ...userFilter,
        status: "pending",
      }),

      QuestionPaper.countDocuments({
        ...userFilter,
        status: "approved",
      }),

      QuestionPaper.countDocuments({
        ...userFilter,
        status: "rejected",
      }),
    ]);

    return res.status(200).json({
      success: true,
      questionPapers,

      stats: {
        total,
        pending,
        approved,
        rejected,
      },

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

module.exports = {getMyUploads}