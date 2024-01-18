const imgbbUploader = require("imgbb-uploader");
const path = require("path");
const Document = require("../../model/document");

exports.uploadDoc = async (req, res) => {
  const file = req.files.file;
  try {
    const newUpload = new Document({
      filename: file.name,
      data: file.data,
      contentType: file.mimetype,
    });
    await newUpload.save();

    // Constructing the URL assuming files are stored locally
    const fileUrl = `${req.protocol}://${req.get("host")}/${file.name}`;
    const filePath = path.join(process.cwd(), "uploads", file.name);
    await file.mv(filePath);

    res.json({ fileUrl });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    res.status(500).json({
      status: "Error",
      code: 500,
      description: "Internal Server Error",
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    console.log(req.files?.img);
    const options = {
      apiKey: process.env.FileUploadKey,
      base64string: req.files?.img?.data?.toString("base64"),
      //   imageUrl: req.body.imageUrl,
    };

    const response = await imgbbUploader(options);
    console.log(response);

    // You can send the imgBB response back to the user
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.uploadImageUrl = async (req, res) => {
  try {
    console.log(req.body.imageUrl);
    const options = {
      apiKey: process.env.FileUploadKey,
      imageUrl: req.body.imageUrl,
    };

    const response = await imgbbUploader(options);
    console.log(response);

    // You can send the imgBB response back to the user
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};
