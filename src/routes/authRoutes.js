import express from 'express'

import { registerDonor } from '../controllers/authController.js'
import { loginUser } from '../controllers/loginController.js';

const router = express.Router()


// Register donor (creates User + Donor)
router.post("/register", registerDonor);

// login user
router.post('/login',loginUser)
export default router;