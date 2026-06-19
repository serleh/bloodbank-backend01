import express from 'express'

import { registerDonor } from '../controllers/authController.js'

const router = express.Router()


// Register donor (creates User + Donor)
router.post("/register", registerDonor);

export default router;