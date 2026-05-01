import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGODB_URI;

if (!url) {
  console.error("MONGODB_URI is missing");
}
console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to database: ");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    city: String,
    gender: { type: String, enum: ["Male", "Female"] },
    weight: Number,
    dob: Date,
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    phone: { type: Number, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    lastDonation: Date,
    medicalCondition: String,
  },
  {
    timestamps: true,
  },
);

donorSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj.__v;
    delete returnedObj._id;
  },
});

export default mongoose.model("Donor", donorSchema);
