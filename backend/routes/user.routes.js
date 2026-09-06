const express = require("express");

const router = express.Router();
const validationMiddleware = require("../middleware/validation.middleware");
const { updateProfileValidator } = require("../validators/user.validators");
const { updateProfile } = require("../controllers/user.controller");

const authenticate = require("../middleware/auth.middleware");
const User = require("../models/User");

router.get("/me", authenticate, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.sub).select(
            "-passwordHash"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
});

router.patch(
    "/me",
    authenticate,
    validationMiddleware(updateProfileValidator),
    updateProfile
);

module.exports = router;