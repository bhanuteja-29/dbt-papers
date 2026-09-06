const QuestionPaper = require("../../models/QuestionPaper");

const getQuestionPapers = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const {
      search,
      course,
      courseCode,
      academicYear,
      examType,
      sort = "newest",
    } = req.query;

    const filter = {
      status: "approved",
    };

    // Exact filters, case-insensitive
    if (course) {
      filter.course = {
        $regex: `^${course.trim()}$`,
        $options: "i",
      };
    }

    if (courseCode) {
      filter.courseCode = {
        $regex: `^${courseCode.trim()}$`,
        $options: "i",
      };
    }

    if (academicYear) {
      filter.academicYear = {
        $regex: `^${academicYear.trim()}$`,
        $options: "i",
      };
    }

    if (examType) {
      filter.examType = {
        $regex: `^${examType.trim()}$`,
        $options: "i",
      };
    }

    // Search
    if (search && search.trim()) {
      const searchRegex = {
        $regex: search.trim(),
        $options: "i",
      };

      filter.$or = [
        { title: searchRegex },
        { course: searchRegex },
        { courseCode: searchRegex },
      ];
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostViewed: { views: -1 },
      mostDownloaded: { downloads: -1 },
      highestRated: { averageRating: -1 },
    };

    const sortQuery =
      sortOptions[sort] || sortOptions.newest;

    const [questionPapers, total] = await Promise.all([
      QuestionPaper.find(filter)
        .populate("uploadedBy", "name")
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),

      QuestionPaper.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      questionPapers,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage:
          page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getQuestionPapers}