import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  getDonors,
  removeDonor,
  searchDonor,
  searchDonorByLocation,
  updateDonor,
} from "../controllers/donorController.js";

const router = express.Router();

router.get("/", getDonors);
router.get("/search", searchDonorByLocation);

router.get("/:id", searchDonor);
router.delete("/:id", removeDonor);

export default router;
