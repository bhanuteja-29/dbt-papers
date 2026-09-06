const QuestionPaper = require("../../models/QuestionPaper");


const getQuestionPaperFilters = async (
  req,
  res,
  next
) => {
  try {
    const [
      courses,
      courseCodes,
      academicYears,
      examTypes,
    ] = await Promise.all([
      QuestionPaper.distinct("course", {
        status: "approved",
      }),

      QuestionPaper.distinct("courseCode", {
        status: "approved",
      }),

      QuestionPaper.distinct("academicYear", {
        status: "approved",
      }),

      QuestionPaper.distinct("examType", {
        status: "approved",
      }),
    ]);

    return res.status(200).json({
      success: true,

      filters: {
        courses: courses.sort(),
        courseCodes: courseCodes.sort(),
        academicYears:
          academicYears.sort().reverse(),
        examTypes: examTypes.sort(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getQuestionPaperFilters}