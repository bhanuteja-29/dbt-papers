const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const questionPaperRoutes = require("./routes/questionPaper.routes");
const errorMiddleware = require("./middleware/error.middleware");
app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/question-papers", questionPaperRoutes);

app.use(errorMiddleware);
module.exports = app;