import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "Hey there ! I on defs",
    },
    photo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    dept: {
      type: String,
      required: [true, "Please enter Dept"],
      enum: {
        values: ["Company", "Management", "Employee", "HeadQ"],
        message: "Please select the Dept",
      },
    },
    local: {
      type: Boolean,
      required: true,
      default: false,
    },
    lvl2: {
      type: Boolean,
      required: true,
      default: false,
    },
    lvl1: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
