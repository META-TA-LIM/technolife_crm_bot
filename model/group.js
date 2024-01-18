const { model, Schema } = require("mongoose");

const groupSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    courseID: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    description: {
      type: String,
      required: true,
    },
    eduDays: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    lessonEndTime: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomID: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    startDate: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    title: {
      type: Boolean,
      required: true,
    },
    teacherID: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Group", groupSchema);
