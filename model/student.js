const { model, Schema } = require("mongoose");

const StudentSchema = new Schema(
  {
    birthdayDate: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Student",
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    status: {
      type: Schema.Types.ObjectId,
      ref: "StudentStatus",
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "StudentTag",
    },
  },
  { timestamps: true }
);

module.exports = model("Student", StudentSchema);
