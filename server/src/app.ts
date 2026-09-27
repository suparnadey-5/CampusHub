import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

// Use require with an any-typed variable to avoid missing type declarations
// for helmet and morgan
const helmet: any = require("helmet");
const morgan: any = require("morgan");

import errorMiddleware from "./middleware/error.middleware";
import AppError from "./utils/AppError";
import authRoutes from "./routes/auth.routes";

const createApp = (swaggerSpec: object): Application => {
  const app: Application = express();

  // Swagger API Documentation
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );

  // Security & parsing
  app.use(helmet());

  app.use(
    cors({
      origin: process.env.CLIENT_URL ?? "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "CampusHub API is live",
    });
  });

  // Feature routes
  app.use("/api/auth", authRoutes);

  // 404 handler — must come after all routes
  app.use((req, _res, next) => {
    next(
      new AppError(
        `Cannot find ${req.originalUrl} on this server`,
        404
      )
    );
  });

  // Global error handler — must be last
  app.use(errorMiddleware);

  return app;
};

export default createApp;