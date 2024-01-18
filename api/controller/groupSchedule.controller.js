const GroupSchedule = require("../../model/groupSchedule");

exports.groupSchedulePost = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const { themeTitle } = req;

    await GroupSchedule.create({
      groupID,
      themeTitle,
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

exports.groupScheduleGet = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const month = req.params.month;

    const GroupSchedules = await GroupSchedule.find({
      groupID: groupID,
    }).populate("studentId groupID");

    const data = [];
    GroupSchedules.map((item) => {
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

exports.groupScheduleEdit = async (req, res) => {
  try {
    const { id, groupID } = req.params;
    const { themeTitle } = req.body;

    await GroupSchedule.findByIdAndUpdate(id, {
      $set: {
        themeTitle,
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

exports.groupScheduleDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await GroupSchedule.findByIdAndDelete(id);

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
