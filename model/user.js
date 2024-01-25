const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    telegramID: {
      type: String,
    },
    lids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lid",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
