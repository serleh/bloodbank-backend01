import bcrypt from "bcrypt";
import User from "../models/User.js";
import Donor from "../models/Donor.js";

// Creating a donor
export const registerDonor = async (req, res, next) => {
  try {
    const {
      username,
      password,

      name,
      address,
      city,
      gender,
      weight,
      dob,
      bloodGroup,
      email,
      lastDonation,
      phone,
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // check username
    const existingUser = await User.findOne({
      username: username.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username: username.toLowerCase().trim(),
      passwordHash,
    });

    // create donor
    const donor = await Donor.create({
      user: user.id,
      name,
      address,
      city,
      gender,
      weight,
      dob,
      bloodGroup,
      contact,
      email,
      lastDonation,
      phone,
    });
    res.status(201).json(donor);
  } catch (error) {
    next(error);
  }
};

// getting user profile

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const donor = await Donor.findOne({
      user: user._id,
    });

    res.json({
      user,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
