const Status = require("../../model/status");
const Lids = require("../../model/lid");

exports.statusPost = async (req, res) => {
  try {
    const { statusName, name } = req.body;

    await Status.create({
      statusName,
      name,
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

exports.statusGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const lids = await Lids.find();

    const Statuss = await Status.find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: "lids",
        populate: {
          path: "seller",
        },
      });

    const statusGroups = {}; // To store items grouped by status

    Statuss.forEach((element) => {
      const status = element.statusName || "default"; // Use "default" if status is not defined

      // Group items by status
      if (!statusGroups[status]) {
        statusGroups[status] = {
          id: element._id,
          name: element.name,
          lids: element.lids,
        };
      }
    });

    const totalCount = await Status.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: statusGroups,
      total_lids: lids.length,
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

exports.statusGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findById(id).populate("lids");

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: status,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.statusEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusName, name } = req.body;

    await Status.findByIdAndUpdate(id, {
      $set: {
        statusName,
        name,
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

exports.statusHide = async (req, res) => {
  try {
    const { id } = req.params;
    const { isHided } = req.body;

    await Status.findByIdAndUpdate(id, {
      $set: {
        isHided,
      },
    });

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: "hided",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.statusDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Status.findByIdAndDelete(id);

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
