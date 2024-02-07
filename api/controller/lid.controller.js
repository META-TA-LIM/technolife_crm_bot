const Lid = require("../../model/lid");
const Status = require("../../model/status");
const User = require("../../model/user");

exports.lidPost = async (req, res) => {
  try {
    const { fullname, phoneNumber, status } = req.body;

    const createdUser = await User.create({
      fullname,
      phoneNumber,
    });

    const UserFound = await User.findById(createdUser._id)._id;

    const lid = await Lid.create({
      UserFound,
    });
    await Status.findByIdAndUpdate(status, {
      $push: {
        lids: lid._id,
      },
    });

    res.status(201).json({
      status: "CREATED",
      code: 201,
      description:
        "The request has been fulfilled and has resulted in one or more new resources being created",
      snapData: "created",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.lidGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Lids = await Lid.find().skip(skip).limit(limit).populate("seller");

    const totalCount = await Lid.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Lids,
      pagination: {
        page: parseInt(page) || 1,
        pageSize: limit,
        pageTotal: Math.ceil(totalCount / limit),
        itemTotal: totalCount,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.lidGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const Lid = await Lid.findById(id).populate("seller");

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Lid,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.lidEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { seller } = req.body;

    await Lid.findByIdAndUpdate(id, {
      $set: {
        seller,
      },
    });
    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: "updated",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.lidDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Lid.findByIdAndDelete(id);

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: "deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.lidReplace = async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to } = req.body;
    const lid = await Lid.findById(id);

    const resultFrom = await Status.findByIdAndUpdate(from, {
      $pull: { lids: lid._id },
    });

    const resultTo = await Status.findByIdAndUpdate(to, {
      $push: { lids: lid._id },
    });

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: "updated",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};
