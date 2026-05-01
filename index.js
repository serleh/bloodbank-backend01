import dotenv from "dotenv";
import express from "express";
import Donor from "./models/donor.js";

dotenv.config();

const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknwon endpoint" });
};

app.use(express.json());
app.use(requestLogger);

// Getting all donors
app.get("/api/donors", (req, res) => {
  Donor.find({}).then((donors) => {
    res.json(donors);
  });
});

// Adding a donor
app.post("/api/donors", (req, res, next) => {
  const body = req.body;

  const donor = new Donor({
    name: body.name,
    address: body.address,
    city: body.city,
    gender: body.gender,
    weight: body.weight,
    dob: body.dob,
    bloodGroup: body.bloodGroup,
    contact: body.contact,
    email: body.email,
    lastDonation: body.lastDonation,
    phone: body.phone,
  });

  donor
    .save()
    .then((savedDonor) => {
      res.status(201).json(savedDonor);
    })
    .catch((error) => {
      next(error);
    });
});

// Search by location
app.get("/api/donors/search", (req, res, next) => {
  const { city, bloodGroup } = req.query;

  if (!city || !bloodGroup) {
    return res.status(400).json({
      error: "city and bloodGroup are required",
    });
  }

  const filter = {
    city: city,
    bloodGroup: bloodGroup.replace(" ", "+").trim().toUpperCase(),
  };

  Donor.find(filter)
    .then((donors) => {
      res.json(donors);
    })
    .catch((error) => {
      next(error);
    });
});

// Getting a single donor
app.get("/api/donors/:id", (req, res, next) => {
  Donor.findById(req.params.id)
    .then((donor) => {
      if (donor) {
        res.json(donor);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete a single donor
app.delete("/api/donors/:id", (req, res) => {
  Donor.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
