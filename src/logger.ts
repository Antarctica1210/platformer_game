import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Define the logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    // Add color to the logs
    colorize({ all: true }),
    // Add a timestamp
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    // Align the log messages
    align(),
    // Define the log format
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  // Define where to send the logs
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join("log", "combined.log"),
    }),
  ],
});

export default logger;
