import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  role: String,
  name: String,
  email: String,
  link: String,
  address: String
});

export default mongoose.model("Company", companySchema);
