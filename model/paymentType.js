const { model, Schema } = require("mongoose");

const PaymentTypeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("PaymentType", PaymentTypeSchema);
