const Group = require("../../model/group");
const Course = require("../../model/course");
const Teacher = require("../../model/teacher");
const Room = require("../../model/room");

exports.groupPost = async (req, res) => {
  try {
    const {
      comment,
      courseID,
      description,
      eduDays,
      endDate,
      lessonEndTime,
      lessonStartTime,
      photo,
      price,
      roomID,
      startDate,
      status,
      teacherID,
      title,
    } = req.body;

    const group = await Group.create({
      comment,
      courseID,
      description,
      eduDays,
      endDate,
      lessonEndTime,
      lessonStartTime,
      photo,
      price,
      roomID,
      startDate,
      status,
      teacherID,
      title,
    });
    await Course.findByIdAndUpdate(courseID, {
      $push: {
        groups: group._id,
      },
    });
    await Room.findByIdAndUpdate(roomID, {
      $push: {
        groups: group._id,
      },
    });
    await Teacher.findByIdAndUpdate(teacherID, {
      $push: {
        groups: group._id,
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

exports.groupGet = async (req, res) => {
  try {
    const { pageSize, page, status, teacherID, courseID } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Groups = await Group.find({
      status: status,
      teacherID: teacherID,
      courseID: courseID,
    })
      .skip(skip)
      .limit(limit)
      .populate("students");

    const totalCount = await Group.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Groups,
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

exports.groupGetDropDown = async (req, res) => {
  try {
    const { pageSize, page, groupTitle } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;
    const searched = groupTitle || "";

    const query = {
      title: { $regex: new RegExp(searched, "i") }, // Case-insensitive search
    };

    const Groups = await Group.find(query)
      .select("title")
      .skip(skip)
      .limit(limit);

    const totalCount = await Group.countDocuments(query);

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Groups,
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

exports.groupGetByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const Groups = await Group.find({ title: title });

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Groups._id,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.groupGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const Group = await Group.findById(id).populate("students");

    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Group,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.groupEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      comment,
      courseID,
      description,
      eduDays,
      endDate,
      lessonEndTime,
      lessonStartTime,
      photo,
      price,
      roomID,
      startDate,
      status,
      teacherID,
      title,
    } = req.body;

    const group = await Group.findById(id);

    await Course.findByIdAndUpdate(group.courseID, {
      $pop: {
        groups: group._id,
      },
    });

    await Room.findByIdAndUpdate(group.roomID, {
      $pop: {
        groups: group._id,
      },
    });
    await Teacher.findByIdAndUpdate(group.teacherID, {
      $pop: {
        groups: group._id,
      },
    });

    const updatedData = await Group.findByIdAndUpdate(id, {
      $set: {
        comment,
        courseID,
        description,
        eduDays,
        endDate,
        lessonEndTime,
        lessonStartTime,
        photo,
        price,
        roomID,
        startDate,
        status,
        teacherID,
        title,
      },
    });

    await Course.findByIdAndUpdate(courseID, {
      $push: {
        groups: updatedData._id,
      },
    });
    await Room.findByIdAndUpdate(roomID, {
      $push: {
        groups: updatedData._id,
      },
    });
    await Teacher.findByIdAndUpdate(teacherID, {
      $push: {
        groups: updatedData._id,
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

exports.groupDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);

    await Course.findByIdAndUpdate(group.courseID, {
      $pop: {
        groups: group._id,
      },
    });

    await Room.findByIdAndUpdate(group.roomID, {
      $pop: {
        groups: group._id,
      },
    });
    await Teacher.findByIdAndUpdate(group.teacherID, {
      $pop: {
        groups: group._id,
      },
    });
    await Group.findByIdAndDelete(id);

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

exports.groupUserDelete = async (req, res) => {
  try {
    const { userID, groupId } = req.query;

    await Group.findOneAndUpdate(
      { userID, groupId },
      {
        $pop: {
          students: userID,
        },
      }
    );

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
