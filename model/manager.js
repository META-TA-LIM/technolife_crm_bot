const { model, Schema } = require("mongoose");

const managerSchema = new Schema(
  {
    addedDate: {
      type: String,
      required: true,
    },
    birthdayDate: {
      type: String,
      required: true,
    },
    fullName: {
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
      default: "Manager",
    },
  },
  { timestamps: true }
);

module.exports = model("Manager", managerSchema);
