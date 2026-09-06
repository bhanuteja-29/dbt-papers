// const QuestionPaper = require("../models/QuestionPaper");

// const {
//   uploadBufferToCloudinary,
//   deleteFromCloudinary,
// } = require("../services/file-upload.service");

// const cloudinary = require("../utils/cloudinary.utils");

// const questionPaperService = require("../services/questionPaper.service");

// /* =========================================================
//    CREATE QUESTION PAPER
// ========================================================= */

// const createQuestionPaper = async (req, res, next) => {
//   const uploadedFiles = [];

//   try {
//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "At least one file is required",
//       });
//     }

//     const pdfFiles = files.filter(
//       (file) => file.mimetype === "application/pdf"
//     );

//     const imageFiles = files.filter(
//       (file) =>
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png"
//     );

//     // Only one PDF is allowed
//     if (pdfFiles.length > 1) {
//       return res.status(400).json({
//         success: false,
//         message: "Only one PDF can be uploaded for a question paper.",
//       });
//     }

//     // PDF cannot be combined with images
//     if (pdfFiles.length === 1 && imageFiles.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "You cannot mix a PDF with images.",
//       });
//     }

//     const {
//       title,
//       course,
//       courseCode,
//       academicYear,
//       examType,
//       description,
//       tags,
//     } = req.body;

//     for (const file of files) {
//       const uploadOptions = {
//         folder: "pyq-papers",
//         resource_type:
//           file.mimetype === "application/pdf" ? "raw" : "image",
//       };

//       if (file.mimetype === "application/pdf") {
//         uploadOptions.public_id = `${courseCode}.pdf`;
//       }

//       const uploadedFile = await uploadBufferToCloudinary(
//         file.buffer,
//         uploadOptions
//       );

//       uploadedFiles.push({
//         fileUrl: uploadedFile.secure_url,
//         filePublicId: uploadedFile.public_id,
//         fileName: file.originalname,
//         fileSize: file.size,
//         resourceType: uploadedFile.resource_type,
//       });
//     }

//     const questionPaper = await QuestionPaper.create({
//       title,
//       course,
//       courseCode,
//       academicYear,
//       examType,

//       uploadedBy: req.user.sub,

//       files: uploadedFiles,

//       description,
//       tags,

//       status: "pending",
//       processingStatus: "pending",

//       rejectionReason: null,
//       rejectedAt: null,
//     });

//     console.log("UPLOADED FILES:", uploadedFiles);

//     return res.status(201).json({
//       success: true,
//       message: "Question paper uploaded successfully",
//       questionPaper,
//     });
//   } catch (error) {
//     // Cleanup Cloudinary files if MongoDB creation fails
//     for (const file of uploadedFiles) {
//       try {
//         await deleteFromCloudinary(
//           file.filePublicId,
//           file.resourceType
//         );
//       } catch (cleanupError) {
//         console.error(
//           "Failed to cleanup Cloudinary file:",
//           cleanupError
//         );
//       }
//     }

//     next(error);
//   }
// };


// /* =========================================================
//    GET APPROVED QUESTION PAPERS
//    PUBLIC REPOSITORY
// ========================================================= */

// const getQuestionPapers = async (req, res, next) => {
//   try {
//     const page = Math.max(Number(req.query.page) || 1, 1);

//     const limit = Math.min(
//       Math.max(Number(req.query.limit) || 10, 1),
//       50
//     );

//     const skip = (page - 1) * limit;

//     const {
//       search,
//       course,
//       courseCode,
//       academicYear,
//       examType,
//       sort = "newest",
//     } = req.query;

//     const filter = {
//       status: "approved",
//     };

//     // Exact filters, case-insensitive
//     if (course) {
//       filter.course = {
//         $regex: `^${course.trim()}$`,
//         $options: "i",
//       };
//     }

//     if (courseCode) {
//       filter.courseCode = {
//         $regex: `^${courseCode.trim()}$`,
//         $options: "i",
//       };
//     }

//     if (academicYear) {
//       filter.academicYear = {
//         $regex: `^${academicYear.trim()}$`,
//         $options: "i",
//       };
//     }

//     if (examType) {
//       filter.examType = {
//         $regex: `^${examType.trim()}$`,
//         $options: "i",
//       };
//     }

//     // Search
//     if (search && search.trim()) {
//       const searchRegex = {
//         $regex: search.trim(),
//         $options: "i",
//       };

//       filter.$or = [
//         { title: searchRegex },
//         { course: searchRegex },
//         { courseCode: searchRegex },
//       ];
//     }

//     const sortOptions = {
//       newest: { createdAt: -1 },
//       oldest: { createdAt: 1 },
//       mostViewed: { views: -1 },
//       mostDownloaded: { downloads: -1 },
//       highestRated: { averageRating: -1 },
//     };

//     const sortQuery =
//       sortOptions[sort] || sortOptions.newest;

//     const [questionPapers, total] = await Promise.all([
//       QuestionPaper.find(filter)
//         .populate("uploadedBy", "name")
//         .sort(sortQuery)
//         .skip(skip)
//         .limit(limit)
//         .lean(),

//       QuestionPaper.countDocuments(filter),
//     ]);

//     return res.status(200).json({
//       success: true,
//       questionPapers,

//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//         hasNextPage:
//           page < Math.ceil(total / limit),
//         hasPreviousPage: page > 1,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// /* =========================================================
//    GET QUESTION PAPER BY ID
// ========================================================= */

// const getQuestionPaperById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const questionPaper =
//       await QuestionPaper.findOneAndUpdate(
//         {
//           _id: id,
//           status: "approved",
//         },
//         {
//           $inc: { views: 1 },
//         },
//         {
//           new: true,
//         }
//       ).populate("uploadedBy", "name");

//     if (!questionPaper) {
//       return res.status(404).json({
//         success: false,
//         message: "Question paper not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       questionPaper,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// /* =========================================================
//    DOWNLOAD QUESTION PAPER
// ========================================================= */

// const downloadQuestionPaper = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const questionPaper =
//       await QuestionPaper.findOne({
//         _id: id,
//         status: "approved",
//       });

//     if (!questionPaper) {
//       return res.status(404).json({
//         success: false,
//         message: "Question paper not found",
//       });
//     }

//     const files = questionPaper.files.map((file) => {
//       const downloadUrl = cloudinary.url(
//         file.filePublicId,
//         {
//           resource_type: file.resourceType,
//           type: "upload",
//           flags: "attachment",
//         }
//       );

//       return {
//         ...file.toObject(),
//         fileUrl: downloadUrl,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Download links generated successfully",
//       files,
//       downloads: questionPaper.downloads,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// /* =========================================================
//    GET MY UPLOADS
// ========================================================= */

// const getMyUploads = async (req, res, next) => {
//   try {
//     const page = Math.max(
//       Number(req.query.page) || 1,
//       1
//     );

//     const limit = Math.min(
//       Math.max(Number(req.query.limit) || 10, 1),
//       50
//     );

//     const skip = (page - 1) * limit;

//     const userFilter = {
//       uploadedBy: req.user.sub,
//     };

//     const [
//       questionPapers,
//       total,
//       pending,
//       approved,
//       rejected,
//     ] = await Promise.all([
//       QuestionPaper.find(userFilter)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),

//       QuestionPaper.countDocuments(userFilter),

//       QuestionPaper.countDocuments({
//         ...userFilter,
//         status: "pending",
//       }),

//       QuestionPaper.countDocuments({
//         ...userFilter,
//         status: "approved",
//       }),

//       QuestionPaper.countDocuments({
//         ...userFilter,
//         status: "rejected",
//       }),
//     ]);

//     return res.status(200).json({
//       success: true,
//       questionPapers,

//       stats: {
//         total,
//         pending,
//         approved,
//         rejected,
//       },

//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// /* =========================================================
//    ADMIN STATS
// ========================================================= */

// const getQuestionPaperStats = async (req, res, next) => {
//   try {
//     const [
//       total,
//       pending,
//       approved,
//       rejected,
//     ] = await Promise.all([
//       QuestionPaper.countDocuments(),

//       QuestionPaper.countDocuments({
//         status: "pending",
//       }),

//       QuestionPaper.countDocuments({
//         status: "approved",
//       }),

//       QuestionPaper.countDocuments({
//         status: "rejected",
//       }),
//     ]);

//     return res.status(200).json({
//       success: true,
//       stats: {
//         total,
//         pending,
//         approved,
//         rejected,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// /* =========================================================
//    PUBLIC FILTERS
// ========================================================= */

// const getQuestionPaperFilters = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const [
//       courses,
//       courseCodes,
//       academicYears,
//       examTypes,
//     ] = await Promise.all([
//       QuestionPaper.distinct("course", {
//         status: "approved",
//       }),

//       QuestionPaper.distinct("courseCode", {
//         status: "approved",
//       }),

//       QuestionPaper.distinct("academicYear", {
//         status: "approved",
//       }),

//       QuestionPaper.distinct("examType", {
//         status: "approved",
//       }),
//     ]);

//     return res.status(200).json({
//       success: true,

//       filters: {
//         courses: courses.sort(),
//         courseCodes: courseCodes.sort(),
//         academicYears:
//           academicYears.sort().reverse(),
//         examTypes: examTypes.sort(),
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// module.exports = {
//   createQuestionPaper,
//   getQuestionPapers,
//   getQuestionPaperById,
//   downloadQuestionPaper,
//   getMyUploads,
//   getQuestionPaperStats,
//   getQuestionPaperFilters,
// };