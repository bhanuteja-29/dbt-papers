const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG, JPEG, and PNG files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 1 MB per file
        files: 5, // Maximum 5 files per question paper
    },
});

module.exports = upload;