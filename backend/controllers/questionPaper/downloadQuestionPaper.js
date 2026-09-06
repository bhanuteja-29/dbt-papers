const QuestionPaper = require("../../models/QuestionPaper");


const cloudinary = require("../../utils/cloudinary.utils");





const downloadQuestionPaper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const questionPaper =
      await QuestionPaper.findOne({
        _id: id,
        status: "approved",
      });

    if (!questionPaper) {
      return res.status(404).json({
        success: false,
        message: "Question paper not found",
      });
    }

    const files = questionPaper.files.map((file) => {
      const downloadUrl = cloudinary.url(
        file.filePublicId,
        {
          resource_type: file.resourceType,
          type: "upload",
          flags: "attachment",
        }
      );

      return {
        ...file.toObject(),
        fileUrl: downloadUrl,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Download links generated successfully",
      files,
      downloads: questionPaper.downloads,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {downloadQuestionPaper}