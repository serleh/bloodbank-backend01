import express from "express";

import { registerDonor, getMe } from "../controllers/authController.js";
import { loginUser } from "../controllers/loginController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register donor (creates User + Donor)
router.post("/register", registerDonor);

// login user
router.post("/login", loginUser);
export default router;

// get user

router.get("/me", protect, getMe);
