import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Donor from "../models/Donor.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: username.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const donor = await Donor.findOne({ user: user._id });

    return res.status(200).json({
      token,
      username: user.username,
      donor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
