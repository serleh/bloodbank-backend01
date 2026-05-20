import express from "express";

export const unKnownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};
