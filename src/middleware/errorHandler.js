import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error("Error Middleware:", err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isProd = process.env.NODE_ENV === "production";

  res.status(status).json({
    message:
      status === 500 && isProd
        ? "Something went wrong. Please try again later."
        : message,
  });
};
