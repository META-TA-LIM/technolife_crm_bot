const { model, Schema } = require("mongoose");

const GroupScheduleSchema = new Schema(
  {
    groupID: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    month: { type: Array, default: [1, 12] },
    themeTitle: { type: String, required: true },
    lessonOrderNumber: { type: Number, default: 2 },
  },
  { timestamps: true }
);

module.exports = model("GroupSchedule", GroupScheduleSchema);
