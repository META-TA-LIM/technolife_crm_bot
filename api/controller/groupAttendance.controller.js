const GroupAttendance = require("../../model/groupAttendance");

exports.groupAttendancePost = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const { absent, homework, studentId } = req;

    await GroupAttendance.create({
      groupID,
      absent,
      homework,
      studentId,
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

exports.groupAttendanceGet = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const month = req.params.month;

    const GroupAttendances = await GroupAttendance.find({
      groupID: groupID,
    }).populate("studentId groupID");

    const data = [];
    GroupAttendances.map((item) => {
      const monthAttendance = new Date(item.created_at).getMonth() + 1 == month;
      data.push(monthAttendance);
    });

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: data,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.groupAttendanceEdit = async (req, res) => {
  try {
    const { id, groupID } = req.params;
    const { absent, homework, studentId } = req.body;

    await GroupAttendance.findByIdAndUpdate(id, {
      $set: {
        absent,
        homework,
        studentId,
        groupID,
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

exports.groupAttendanceDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await GroupAttendance.findByIdAndDelete(id);

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
