import express from "express";

import {
  createDonor,
  getDonors,
  removeDonor,
  searchDonor,
  searchDonorByLocation,
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/", createDonor);
router.get("/", getDonors);
router.get("/search", searchDonorByLocation);
router.get("/:id", searchDonor);
router.delete("/:id", removeDonor);

export default router;
