const Lid = require("../../model/lid");
const List = require("../../model/list");

exports.lidPost = async (req, res) => {
  try {
    const {
      comment,
      courseID,
      fullName,
      lastConnection,
      location,
      phoneNumber,
      status,
      listID,
      userID,
    } = req.body;

    const lid = await Lid.create({
      comment,
      courseID,
      fullName,
      lastConnection,
      location,
      phoneNumber,
      status,
      listID,
      userID,
    });
    await List.findByIdAndUpdate(listID, {
      $push: {
        lid: lid._id,
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
    const { pageSize, page, searchKey, courseID, userID } = req.query;

    const searched = searchKey || "";

    const query = {
      title: { $regex: new RegExp(searched, "i") }, // Case-insensitive search
    };

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Lids = await Lid.find(
      {
        userID: userID,
        courseID: courseID,
      },
      query
    )
      .skip(skip)
      .limit(limit)
      .populate("courseID listID userID");

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
    const Lid = await Lid.findById(id).populate("courseID listID userID");

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
    const {
      comment,
      courseID,
      fullName,
      lastConnection,
      location,
      phoneNumber,
      status,
      listID,
      userID,
    } = req.body;

    const Lid = await Lid.findById(id);

    await List.findByIdAndUpdate(Lid.listID, {
      $pop: {
        lid: Lid._id,
      },
    });

    const updatedData = await Lid.findByIdAndUpdate(id, {
      $set: {
        comment,
        courseID,
        fullName,
        lastConnection,
        location,
        phoneNumber,
        status,
        listID,
        userID,
      },
    });

    await List.findByIdAndUpdate(listID, {
      $push: {
        lid: updatedData._id,
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

    await List.findByIdAndUpdate(Lid.listID, {
      $pop: {
        lid: Lid._id,
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

    await List.findByIdAndUpdate(from, {
      $pop: {
        lid: Lid._id,
      },
    });

    await List.findByIdAndUpdate(to, {
      $push: {
        lid: Lid._id,
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
