const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(

  {

    fullname: {
      type: String,
      default: "",
    },

    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },

    bio: {
      type: String,
      max: 100,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },

    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    
  },

  {
    timestamps: true,
  },

);



module.exports = mongoose.model("User", UserSchema);