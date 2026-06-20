import express from "express";
import cors from "cors";
import donorRoutes from "./src/routes/donorRoutes.js";
import authRoutes from './src/routes/authRoutes.js';
import { unKnownEndpoint } from "./src/middlewares/notFound.js";
import { requestLogger } from "./src/middlewares/requestLogger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use(requestLogger);

// routes
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

app.use("/api/donors", donorRoutes);
app.use("/api/auth",authRoutes)

app.use(unKnownEndpoint);
app.use(errorHandler);

export default app;
