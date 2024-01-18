const { model, Schema } = require("mongoose");

const StudentTagSchema = new Schema(
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

module.exports = model("StudentTag", StudentTagSchema);
