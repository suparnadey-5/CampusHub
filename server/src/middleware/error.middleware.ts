import { Request, Response, NextFunction } from "express";
import AppError  from "../utils/AppError";
import mongoose from "mongoose";

const handleCastError = (err: mongoose.Error.CastError): AppError =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateKeyError = (err: any): AppError => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(`${field} already exists`, 409);
};

const handleValidationError = (
  err: mongoose.Error.ValidationError
): AppError => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Validation failed: ${messages.join(". ")}`, 400);
};

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = err;

  // Normalize Mongoose-specific errors into AppErrors
  if (err instanceof mongoose.Error.CastError)
    error = handleCastError(err);
  if (err.code === 11000)
    error = handleDuplicateKeyError(err);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationError(err);

  const statusCode = error.statusCode ?? 500;
  const message =
    error.isOperational ? error.message : "Something went wrong";

  if (process.env.NODE_ENV === "development" && !error.isOperational) {
    console.error("UNHANDLED ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddleware;
