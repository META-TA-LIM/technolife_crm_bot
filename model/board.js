const { model, Schema } = require("mongoose");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
