import mongoose from "mongoose";

//Schema definition
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});

//model
const user = mongoose.model("User", userSchema);

//export the model
export default user;
