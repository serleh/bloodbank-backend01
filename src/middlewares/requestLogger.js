import express from "express";
import { info } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    info("------ REQUEST LOG ------");
    info("Method:", req.method);
    info("Path:", req.path);

    const safeBody = { ...req.body };

    // remove sensitive fields
    delete safeBody.password;
    delete safeBody.token;

    info("Body:", safeBody);
    info("-------------------------");
  }

  next();
};
