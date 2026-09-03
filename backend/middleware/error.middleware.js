const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    // Multer-specific errors
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File size must not exceed 10 MB",
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    // Our custom fileFilter error
    if (err.message === "Only PDF, JPG, JPEG, and PNG files are allowed") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    // Generic error
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};

module.exports = errorMiddleware;