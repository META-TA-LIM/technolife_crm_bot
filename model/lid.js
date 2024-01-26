const { model, Schema } = require("mongoose");

const LidSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Lid", LidSchema);
