const QuestionPaper = require("../models/QuestionPaper");

const {
    uploadBufferToCloudinary,
    deleteFromCloudinary,
} = require("../services/file-upload.service");

const createQuestionPaper = async (req, res, next) => {
    let uploadedFile = null;

    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is required",
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

        uploadedFile = await uploadBufferToCloudinary(
            file.buffer,
            {
                folder: "pyq-papers",
                resource_type:
                    file.mimetype === "application/pdf"
                        ? "raw"
                        : "image",
            }
        );

        const questionPaper = await QuestionPaper.create({
            title,
            course,
            courseCode,
            academicYear,
            examType,

            uploadedBy: req.user.sub,

            fileUrl: uploadedFile.secure_url,
            filePublicId: uploadedFile.public_id,
            fileName: file.originalname,
            fileSize: file.size,

            description,
            tags,

            status: "pending",
            processingStatus: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Question paper uploaded successfully",
            questionPaper,
        });
    } catch (error) {
        if (uploadedFile?.public_id) {
            try {
                await deleteFromCloudinary(
                    uploadedFile.public_id,
                    uploadedFile.resource_type
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

const getPendingQuestionPapers = async (req, res, next) => {
    try {
        const questionPapers = await QuestionPaper.find({
            status: "pending",
        })
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: questionPapers.length,
            questionPapers,
        });
    } catch (error) {
        next(error);
    }
};

const approveQuestionPaper = async (req, res, next) => {
    try {
        const { id } = req.params;

        const questionPaper = await QuestionPaper.findById(id);

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        if (questionPaper.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Question paper has already been reviewed",
            });
        }

        questionPaper.status = "approved";

        await questionPaper.save();

        return res.status(200).json({
            success: true,
            message: "Question paper approved successfully",
            questionPaper,
        });
    } catch (error) {
        next(error);
    }
};

const rejectQuestionPaper = async (req, res, next) => {
    try {
        const { id } = req.params;

        const questionPaper = await QuestionPaper.findById(id);

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        if (questionPaper.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Question paper has already been reviewed",
            });
        }

        questionPaper.status = "rejected";

        await questionPaper.save();

        return res.status(200).json({
            success: true,
            message: "Question paper rejected successfully",
            questionPaper,
        });
    } catch (error) {
        next(error);
    }
};

const getQuestionPapers = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 10, 1),
            50
        );

        const skip = (page - 1) * limit;

        const { search, course, courseCode, academicYear, examType } =
            req.query;

        const filter = {
            status: "approved",
        };

        if (course) {
            filter.course = course;
        }

        if (courseCode) {
            filter.courseCode = courseCode;
        }

        if (academicYear) {
            filter.academicYear = academicYear;
        }

        if (examType) {
            filter.examType = examType;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { course: { $regex: search, $options: "i" } },
                { courseCode: { $regex: search, $options: "i" } },
            ];
        }

        const [questionPapers, total] = await Promise.all([
            QuestionPaper.find(filter)
                .populate("uploadedBy", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

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
            },
        });
    } catch (error) {
        next(error);
    }
};


const getQuestionPaperById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const questionPaper = await QuestionPaper.findOneAndUpdate(
            {
                _id: id,
                status: "approved",
            },
            {
                $inc: { views: 1 },
            },
            {
                new: true,
            }
        ).populate("uploadedBy", "name");

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        return res.status(200).json({
            success: true,
            questionPaper,
        });
    } catch (error) {
        next(error);
    }
};

const downloadQuestionPaper = async (req, res, next) => {
    try {
        const { id } = req.params;

        const questionPaper = await QuestionPaper.findOneAndUpdate(
            {
                _id: id,
                status: "approved",
            },
            {
                $inc: { downloads: 1 },
            },
            {
                new: true,
            }
        );

        if (!questionPaper) {
            return res.status(404).json({
                success: false,
                message: "Question paper not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Download link generated successfully",
            downloadUrl: questionPaper.fileUrl,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuestionPaper,
    getPendingQuestionPapers,
    approveQuestionPaper,
    rejectQuestionPaper,
    getQuestionPapers,
    getQuestionPaperById,
    downloadQuestionPaper
};