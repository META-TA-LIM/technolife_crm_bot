const { model, Schema } = require("mongoose");

const settingsSchema = new Schema(
  {
    companyTitle: {
      type: String,
      required: true,
    },
    companyLogoFile: {
      type: String,
      required: true,
    },
    siteEnterLogo: {
      type: String,
      required: true,
    },
    companyPhone: {
      type: Number,
      required: true,
    },
    siteColor: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Settings", settingsSchema);
