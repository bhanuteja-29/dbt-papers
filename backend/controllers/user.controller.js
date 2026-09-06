const User = require("../models/User");

const updateProfile = async (req, res, next) => {
    try {
        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.sub,
            {
                name,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-passwordHash");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateProfile,
};