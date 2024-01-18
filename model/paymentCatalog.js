const { model, Schema } = require("mongoose");

const PaymentCatalogSchema = new Schema(
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

module.exports = model("PaymentCatalog", PaymentCatalogSchema);
