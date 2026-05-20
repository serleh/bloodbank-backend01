import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import { info } from "./src/utils/logger.js";
import app from "./app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
