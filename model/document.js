const { model, Schema } = require("mongoose");

const documentSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Document", documentSchema);
