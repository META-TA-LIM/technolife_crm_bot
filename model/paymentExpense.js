const { model, Schema } = require("mongoose");

const PaymentExpenseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentCatalog: {
      type: Schema.Types.ObjectId,
      ref: "PaymentCatalog",
    },
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: "PaymentType",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("PaymentExpense", PaymentExpenseSchema);
