const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    telegramID: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
