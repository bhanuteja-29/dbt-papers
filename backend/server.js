const app = require("./app");
const config = require("./config/env");
const connectDB = require("./config/database");

const startServer = async () => {
    try {
        await connectDB();

        app.listen(config.port, "0.0.0.0", () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();