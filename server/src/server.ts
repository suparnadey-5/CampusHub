import "dotenv/config";
import createApp from "./app";
import loadSwaggerSpec from "./config/swagger";
import connectDB from "./config/db";

const PORT = parseInt(process.env.PORT ?? "5000", 10);

const startServer = async (): Promise<void> => {
  await connectDB();
  const swaggerSpec = await loadSwaggerSpec();
  const app = createApp(swaggerSpec);

  const server = app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    server.close(() => process.exit(1));
  });
};

startServer();
