const User = require("../../model/user");

exports.userPost = async (req, res) => {
  try {
    const { name, surname, phoneNumber, from } = req.body;

    await User.create({
      name,
      surname,
      phoneNumber,
      from,
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

exports.userGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Users = await User.find().skip(skip).limit(limit).populate("lids");

    const totalCount = await User.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Users,
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

exports.userGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findById(id).populate("lids");

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: User,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.userEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, phoneNumber, from } = req.body;

    await User.findByIdAndUpdate(id, {
      $set: {
        name,
        surname,
        phoneNumber,
        from,
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

exports.userDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

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
