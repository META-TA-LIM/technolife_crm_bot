const { model, Schema } = require("mongoose");

const employeeSchema = new Schema(
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
    roleID: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    group: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
