const Permission = require("../../model/permission");

exports.permissionPost = async (req, res) => {
  try {
    const { description, method, tag, title, url } = req.body;

    await Permission.create({
      description,
      method,
      tag,
      title,
      url,
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

exports.permissionGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const permissions = await Permission.find().skip(skip).limit(limit);

    const totalCount = await Permission.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: permissions,
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

exports.permissionGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: permission,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.permissionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, method, tag, title, url } = req.body;

    await Permission.findByIdAndUpdate(id, {
      $set: {
        description,
        method,
        tag,
        title,
        url,
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

exports.permissionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Permission.findByIdAndDelete(id);

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
