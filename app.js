const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const morgan = require("morgan");

const recipesRouter = require("./routers/recipesRouter");
const OperationalError = require("./helpers/operationalError");
const globalErrorHandler = require("./helpers/globalErrorHandler");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 150,
  message:
    "Too many requests made from this IP, please try again after an hour.",
});

app.use(cors({ origin: process.env.FRONTEND_HOST }));
app.options("*", cors());
app.use(helmet());
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));
app.use("/api", limiter);
app.use(express.json({ limit: "5MB" }));
app.use(mongoSanitize());
app.use(compression());

app.use("/api/v1/recipes", recipesRouter);

app.all("*", (req, res, next) => {
  next(
    new OperationalError(404, `Can't '${req.method}' on '${req.originalUrl}'.`)
  );
});

app.use(globalErrorHandler);

module.exports = app;
