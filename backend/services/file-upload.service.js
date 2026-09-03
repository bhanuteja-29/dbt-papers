const { Readable } = require("stream");

const cloudinary = require("../utils/cloudinary.utils");

const uploadBufferToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error) {
                    console.error("CLOUDINARY UPLOAD ERROR:");
                    console.error(error);
                    console.error("HTTP CODE:", error.http_code);
                    console.error("MESSAGE:", error.message);
                    console.error("NAME:", error.name);

                    return reject(error);
                }

                resolve(result);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
};

const deleteFromCloudinary = async (publicId, resourceType = "raw") => {
    return cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });
};

module.exports = {
    uploadBufferToCloudinary,deleteFromCloudinary
};