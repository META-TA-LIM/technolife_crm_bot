const { model, Schema } = require("mongoose");

const roomSchema = new Schema(
  {
    closeTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
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
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Room", roomSchema);
