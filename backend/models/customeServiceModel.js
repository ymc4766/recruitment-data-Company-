import mongoose from "mongoose";

const customerServiceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      // required: true,
    },

    customerNumber: {
      type: Number,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    agentNumber: {
      type: Number,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    // assignedAgent: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Agent",
    // },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CustomerService = mongoose.model(
  "CustomerService",
  customerServiceSchema
);

export default CustomerService;
