const QuestionPaper = require("../../models/QuestionPaper");

const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} = require("../../services/file-upload.service");


/* =========================================================
   CREATE QUESTION PAPER
========================================================= */

const createQuestionPaper = async (req, res, next) => {
  const uploadedFiles = [];

  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one file is required",
      });
    }

    const pdfFiles = files.filter(
      (file) => file.mimetype === "application/pdf"
    );

    const imageFiles = files.filter(
      (file) =>
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    );

    // Only one PDF is allowed
    if (pdfFiles.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Only one PDF can be uploaded for a question paper.",
      });
    }

    // PDF cannot be combined with images
    if (pdfFiles.length === 1 && imageFiles.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You cannot mix a PDF with images.",
      });
    }

    const {
      title,
      course,
      courseCode,
      academicYear,
      examType,
      description,
      tags,
    } = req.body;

    for (const file of files) {
      const uploadOptions = {
        folder: "pyq-papers",
        resource_type:
          file.mimetype === "application/pdf" ? "raw" : "image",
      };

      if (file.mimetype === "application/pdf") {
        uploadOptions.public_id = `${courseCode}.pdf`;
      }

      const uploadedFile = await uploadBufferToCloudinary(
        file.buffer,
        uploadOptions
      );

      uploadedFiles.push({
        fileUrl: uploadedFile.secure_url,
        filePublicId: uploadedFile.public_id,
        fileName: file.originalname,
        fileSize: file.size,
        resourceType: uploadedFile.resource_type,
      });
    }

    const questionPaper = await QuestionPaper.create({
      title,
      course,
      courseCode,
      academicYear,
      examType,

      uploadedBy: req.user.sub,

      files: uploadedFiles,

      description,
      tags,

      status: "pending",
      processingStatus: "pending",

      rejectionReason: null,
      rejectedAt: null,
    });

    console.log("UPLOADED FILES:", uploadedFiles);

    return res.status(201).json({
      success: true,
      message: "Question paper uploaded successfully",
      questionPaper,
    });
  } catch (error) {
    // Cleanup Cloudinary files if MongoDB creation fails
    for (const file of uploadedFiles) {
      try {
        await deleteFromCloudinary(
          file.filePublicId,
          file.resourceType
        );
      } catch (cleanupError) {
        console.error(
          "Failed to cleanup Cloudinary file:",
          cleanupError
        );
      }
    }

    next(error);
  }
};

module.exports = {createQuestionPaper}