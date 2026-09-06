const QuestionPaper = require("../models/QuestionPaper");
const cloudinary = require("../utils/cloudinary.utils");

/* =========================================================
   GET ADMIN MANAGED QUESTION PAPERS
   Used for approved and rejected papers
========================================================= */

const getAdminManagedQuestionPapers = async ({
  status,
  page = 1,
  limit = 10,
}) => {
  // Only these two statuses are allowed here
  if (!["approved", "rejected"].includes(status)) {
    throw new Error(
      "Status must be either approved or rejected"
    );
  }

  const currentPage = Math.max(Number(page) || 1, 1);

  const currentLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    50
  );

  const skip = (currentPage - 1) * currentLimit;

  const filter = {
    status,
  };

  const [questionPapers, total] = await Promise.all([
    QuestionPaper.find(filter)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    QuestionPaper.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(
    total / currentLimit
  );

  return {
    questionPapers,

    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
};


/* =========================================================
   DELETE QUESTION PAPER
   Deletes:
   1. Files from Cloudinary
   2. Paper from MongoDB

   Works for:
   - pending
   - approved
   - rejected
========================================================= */

const deleteQuestionPaper = async (paperId) => {
  const paper = await QuestionPaper.findById(paperId);

  if (!paper) {
    throw new Error("Question paper not found");
  }

  // Delete all associated files from Cloudinary
  if (paper.files && paper.files.length > 0) {
    for (const file of paper.files) {
      if (!file.filePublicId) {
        continue;
      }

      try {
        await cloudinary.uploader.destroy(
          file.filePublicId,
          {
            resource_type:
              file.resourceType || "raw",
          }
        );
      } catch (error) {
        console.error(
          `Failed to delete Cloudinary file ${file.filePublicId}:`,
          error.message
        );
      }
    }
  }

  // Delete paper from MongoDB
  await QuestionPaper.findByIdAndDelete(paperId);

  return {
    message:
      "Question paper deleted successfully",
  };
};


module.exports = {
  getAdminManagedQuestionPapers,
  deleteQuestionPaper,
};