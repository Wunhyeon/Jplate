import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
    unique: true,
  },
  Videos: {
    type: String,
  },
  Coupons: {
    type: String,
  },
  Membership: {
    type: String,
  },
  Receipt: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
