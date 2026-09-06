const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const upload = require("../middleware/upload.middleware");
const questionPaperStatusController = require("../controllers/questionPaperStatus.controller");
const adminQuestionPaperController = require("../controllers/adminQuestionPaper.controller");
const {createQuestionPaper} = require("../controllers/questionPaper/createQuestionPaper");
const {downloadQuestionPaper} = require("../controllers/questionPaper/downloadQuestionPaper");
const {getMyUploads} = require("../controllers/questionPaper/getMyUploads");
const {getQuestionPaperById} = require("../controllers/questionPaper/getQuestionPaperbyId");
const {getQuestionPaperFilters} = require("../controllers/questionPaper/getQuestionPaperFilters");
const {getQuestionPapers}= require("../controllers/questionPaper/getQuestionPapers");
const {getQuestionPaperStats} = require("../controllers/questionPaper/getQuestionPaperStats");

// =========================================================
// PUBLIC ROUTES
// =========================================================

// Get approved question papers
router.get(
  "/",
  getQuestionPapers
);

// Get available filters
router.get(
  "/filters",
  getQuestionPaperFilters
);


// =========================================================
// AUTHENTICATED USER ROUTES
// =========================================================

// Get current user's uploads
router.get(
  "/my-uploads",
  authenticate,
  getMyUploads
);

// Upload question paper
router.post(
  "/",
  authenticate,
  upload.array("files", 5),
  createQuestionPaper
);


// =========================================================
// ADMIN ROUTES
// =========================================================

// Get pending papers
router.get(
  "/pending",
  authenticate,
  authorize("admin"),
  questionPaperStatusController.getPendingQuestionPapers
);

// Get approved/rejected papers for admin management
//
// Examples:
// GET /question-papers/admin/manage?status=approved
// GET /question-papers/admin/manage?status=rejected
router.get(
  "/admin/manage",
  authenticate,
  authorize("admin"),
  adminQuestionPaperController.getAdminManagedQuestionPapers
);

// Admin statistics
router.get(
  "/admin/stats",
  authenticate,
  authorize("admin"),
  getQuestionPaperStats
);


// =========================================================
// QUESTION PAPER ACTIONS
// =========================================================

// View individual approved question paper
router.get(
  "/:id",
  getQuestionPaperById
);

// Delete question paper
// Admin can delete pending, approved, or rejected papers
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  adminQuestionPaperController.deleteQuestionPaper
);

// Approve question paper
// Supports pending -> approved
// Supports rejected -> approved
router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  questionPaperStatusController.approveQuestionPaper
);

// Reject question paper
router.patch(
  "/:id/reject",
  authenticate,
  authorize("admin"),
  questionPaperStatusController.rejectQuestionPaper
);

// Generate download links
router.get(
  "/:id/download",
  authenticate,
  downloadQuestionPaper
);


module.exports = router;