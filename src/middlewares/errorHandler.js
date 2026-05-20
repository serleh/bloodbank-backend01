import express from "express";
import { info } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  info(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  }
  next();
};
