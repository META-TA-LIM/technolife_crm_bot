const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    lessonDuration: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);
