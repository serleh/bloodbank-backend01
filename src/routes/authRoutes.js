import express from "express";

import { registerDonor, getMe } from "../controllers/authController.js";
import { loginUser } from "../controllers/loginController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { updateDonor } from "../controllers/donorController.js";

const router = express.Router();

// Register donor (creates User + Donor)
router.post("/register", registerDonor);

// login user
router.post("/login", loginUser);

router.put("/me", protect, updateDonor);

// get user
router.get("/me", protect, getMe);
export default router;
