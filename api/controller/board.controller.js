const Board = require("../../model/board");

exports.boardPost = async (req, res) => {
  try {
    const { title } = req.body;

    await Board.create({
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

exports.boardGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Boards = await Board.find().skip(skip).limit(limit).populate("list");

    const totalCount = await Board.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Boards,
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

exports.boardGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const Board = await Board.findById(id).populate("list");

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Board,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.boardEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await Board.findByIdAndUpdate(id, {
      $set: {
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

exports.boardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Board.findByIdAndDelete(id);

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
