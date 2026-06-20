import Donor from "../models/Donor.js";



// Getting all donors
export const getDonors = async (req, res, next) => {
  try {
    const donors = await Donor.find().populate("user");

    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }
    res.json(donors);
  } catch (error) {
    next(error);
  }
};

// Search donor by location
export const searchDonorByLocation = async (req, res, next) => {
  try {
    const { city, bloodGroup } = req.query;

    if (!city || !bloodGroup) {
      return res.status(400).json({ error: "City and blood group required" });
    }

  
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const filter = {
  city: new RegExp(`^${escapeRegex(city.trim())}$`, "i"),
  bloodGroup: bloodGroup.replace(" ", "+").trim().toUpperCase(),
};
console.log("Query:", req.query);
console.log("Filter:", filter);

    const donors = await Donor.find(filter);
    // Checking if no donors
    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }
    res.json(donors);
  } catch (error) {
    next(error);
  }
};

// Search for a single donor
export const searchDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id).populate("user","username");
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    next(error);
  }
};

// Delete a donor
export const removeDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    next(error);
  }
};
