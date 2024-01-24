const { model, Schema } = require("mongoose");

const LidSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Lid", LidSchema);
