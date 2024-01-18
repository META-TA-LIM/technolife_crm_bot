const { model, Schema } = require("mongoose");

const PaymentIncomeSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: "PaymentType",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("PaymentIncome", PaymentIncomeSchema);
