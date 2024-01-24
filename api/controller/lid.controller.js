const Lid = require("../../model/lid");
const User = require("../../model/user");

exports.lidPost = async (req, res) => {
  try {
    const { status, text, userID } = req.body;

    const lid = await Lid.create({
      status,
      text,
      userID,
    });
    await User.findByIdAndUpdate(userID, {
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

    const Lids = await Lid.find().skip(skip).limit(limit).populate("userID");

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
    const Lid = await Lid.findById(id).populate("userID");

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
    const { status, text, userID } = req.body;

    const Lid = await Lid.findById(id);

    await User.findByIdAndUpdate(Lid.userID, {
      $pop: {
        lids: Lid._id,
      },
    });

    const updatedData = await Lid.findByIdAndUpdate(id, {
      $set: {
        status,
        text,
        userID,
      },
    });

    await User.findByIdAndUpdate(userID, {
      $push: {
        lids: updatedData._id,
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
    const Lid = await Lid.findById(id);

    await User.findByIdAndUpdate(Lid.userID, {
      $pop: {
        lids: Lid._id,
      },
    });

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

    const Lid = await Lid.findById(id);

    await User.findByIdAndUpdate(from, {
      $pop: {
        lids: Lid._id,
      },
    });

    await User.findByIdAndUpdate(to, {
      $push: {
        lids: Lid._id,
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
