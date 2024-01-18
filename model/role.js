const { model, Schema } = require("mongoose");

const roleSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    restriction: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Role", roleSchema);
