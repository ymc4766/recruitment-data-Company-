import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import csurf from "csurf";
import compression from "compression";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import { errorHandler, handleNotFound } from "./middlewares/errorHandler.js";

const app = express();

// Error handling middleware
app.use(errorHandler);

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

dotenv.config();
db();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Security middleware
app.use(helmet());
app.use(cookieParser());
app.use(compression());
// app.use(csurf());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());

app.get("/", (req, res) => {
  res.send("app started ");
});

app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/customer", customerRoutes);

app.use("*", handleNotFound);
// app.use(serverError);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`app is running`.white.inverse);
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
