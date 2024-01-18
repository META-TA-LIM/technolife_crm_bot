const Permission = require("../../model/role");

exports.rolePost = async (req, res) => {
  try {
    const { description, document, title } = req.body;

    await Permission.create({
      description,
      document,
      title,
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

exports.roleGet = async (req, res) => {
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

exports.roleGetDropDown = async (req, res) => {
  try {
    const { pageSize, page, searchKey } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;
    const searched = searchKey || "";

    const query = {
      title: { $regex: new RegExp(searched, "i") }, // Case-insensitive search
    };

    const permissions = await Permission.find(query)
      .select("title")
      .skip(skip)
      .limit(limit);

    const totalCount = await Permission.countDocuments(query);

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

exports.roleGetByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const permissions = await Permission.find({ title: title });

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: permissions._id,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.roleGetOne = async (req, res) => {
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

exports.roleEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, document, title } = req.body;

    await Permission.findByIdAndUpdate(id, {
      $set: {
        description,
        document,
        title,
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

exports.roleDelete = async (req, res) => {
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
