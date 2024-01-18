const { model, Schema } = require("mongoose");

const adminSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("Admin", adminSchema);
