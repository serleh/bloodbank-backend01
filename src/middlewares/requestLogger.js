import express from "express";
import { info } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  info("------ REQUEST LOG ------");

  info("Method:", req.method);
  info("Path:", req.path);
  info("Body:", req.body);

  info("-------------------------");
  next();
};
