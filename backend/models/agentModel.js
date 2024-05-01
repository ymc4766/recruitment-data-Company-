import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      //   required: true,
    },
    address: {
      type: String,
    },
    expertise: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
