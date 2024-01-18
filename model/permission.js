const { model, Schema } = require("mongoose");

const permissionSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Permission", permissionSchema);
