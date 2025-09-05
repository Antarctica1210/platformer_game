import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Define the logger configuration
const logger = winston.createLogger({
  // Set the default level. Can be overridden by environment variables.
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    // Add color to the logs for better readability in development
    colorize({ all: true }),
    // Add a timestamp
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    // Align the log messages
    align(),
    // Define the log message format
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  // Define where to send the logs. In this case, only to the console.
  transports: [new winston.transports.Console()],
});

export default logger;
