const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  mothername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    //it use for unique values and make a restrictions
    unique: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
