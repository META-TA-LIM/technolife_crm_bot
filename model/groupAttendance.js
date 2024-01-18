const { model, Schema } = require("mongoose");

const GroupAttendanceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    groupID: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    absent: { type: Boolean, required: true, default: true },
    homework: { type: Boolean, required: true, default: true },
    lessonOrderNumber: { type: Number, default: 2 },
  },
  { timestamps: true }
);

module.exports = model("GroupAttendance", GroupAttendanceSchema);
