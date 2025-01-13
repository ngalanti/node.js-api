const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      enum: [
        "food",
        "rent",
        "transport",
        "clothing",
        "entertainment",
        "health",
        "education",
        "other",
      ],
    },
    currency: {
      type: String,
      required: true,
      default: "ILS",
      enum: ["ILS", "USD", "EUR"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
