import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    city: String,
    gender: { type: String, enum: ["male", "female"] },
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
    medicalCondition: {
      type: String,
      default: "None",
    },
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

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
