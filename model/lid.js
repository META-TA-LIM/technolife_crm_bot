const { model, Schema } = require("mongoose");

const lidSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    courseID: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    fullName: {
      type: String,
      required: true,
    },
    lastConnection: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    listID: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Lid", lidSchema);
