const Course = require("../../model/course");

exports.coursePost = async (req, res) => {
  try {
    const {
      description,
      duration,
      lessonDuration,
      photo,
      price,
      status,
      title,
    } = req.body;

    await Course.create({
      description,
      duration,
      lessonDuration,
      photo,
      price,
      status,
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

exports.courseGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Courses = await Course.find()
      .skip(skip)
      .limit(limit)
      .populate("groups");

    const totalCount = await Course.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Courses,
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

exports.courseGetDropDown = async (req, res) => {
  try {
    const { pageSize, page, searchKey } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;
    const searched = searchKey || "";

    const query = {
      title: { $regex: new RegExp(searched, "i") }, // Case-insensitive search
    };

    const Courses = await Course.find(query)
      .select("title")
      .skip(skip)
      .limit(limit);

    const totalCount = await Course.countDocuments(query);

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Courses,
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

exports.courseGetByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const Courses = await Course.find({ title: title });

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Courses._id,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.courseGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const Course = await Course.findById(id);

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.courseEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      duration,
      lessonDuration,
      photo,
      price,
      status,
      title,
    } = req.body;

    await Course.findByIdAndUpdate(id, {
      $set: {
        description,
        duration,
        lessonDuration,
        photo,
        price,
        status,
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

exports.courseDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);

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
