const { model, Schema } = require("mongoose");

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    lid: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lid",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("List", listSchema);
