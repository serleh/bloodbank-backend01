import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj.__v;
    delete returnedObj._id;
    // the passwordHash should not be revealed
    delete returnedObj.passwordHash;
  },
});

export default mongoose.model("User", userSchema);
