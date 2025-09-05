import { Player } from "./Player.js";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import logger from "./logger.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const INITIAL_LIFE = process.env.INITIAL_LIFE
  ? parseInt(process.env.INITIAL_LIFE, 10)
  : 3;

// parse json request
app.use(express.json());

// health check when deployed to AWS
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// POST
app.post("/calculate", (req: Request, res: Response) => {
  try {
    const { initialSpeed, inclines } = req.body;

    // Validate the input initial values
    if (typeof initialSpeed !== "number") {
      throw new Error("`initialSpeed` is missing or is not a number.");
    }

    if (
      !Array.isArray(inclines) ||
      !inclines.every((i) => typeof i === "number")
    ) {
      throw new Error("`inclines` is missing or is not an array of numbers.");
    }

    // initialise the player
    const myPlayer = new Player(initialSpeed, INITIAL_LIFE);

    const finalSpeed = myPlayer.calculate_final_speed(myPlayer.speed, inclines);

    res.json({ finalSpeed });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request body format.";
    logger.error(`Error in /calculate: ${message}`);
    res.status(400).json({
      error: "Bad Request",
      message,
      expectedFormat: {
        initialSpeed: "number",
        inclines: "number[]",
      },
    });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
