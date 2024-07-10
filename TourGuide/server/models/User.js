const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = require("../config/env");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      minLength: [3, "First Name should be at least 3 characters!"],
      maxLength: [15, "First Name must be no more than 15 characters!"]
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      minLength: [3, "Last Name should be at least 3 characters!"],
      maxLength: [15, "Last Name must be no more than 15 characters"]
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
      minLength: [3, "Username should be at least 3 characters!"],
      maxLength: [15, "Username must be no more than 15 characters!"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      match: [/^[a-zA-Z0-9.,!-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Invalid email"]
    },
    profilePicture: {
      type: String,
      required: [true, "Image URL is required!"],
      match: [/^https?:\/\//, "The photo image is required and should start with http:// or https://!"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required!"]
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [3, "Password should be at least 3 characters!"]
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Like"
      }
    ]
  },
  { timestamps: true }
);

// Използване на SALT_ROUNDS от конфигурацията
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
