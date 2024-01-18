const Employee = require("../../model/employee");

exports.employeePost = async (req, res) => {
  try {
    const {
      addedDate,
      birthdayDate,
      fullName,
      password,
      phoneNumber,
      photo,
      roleID,
    } = req.body;

    await Employee.create({
      addedDate,
      birthdayDate,
      fullName,
      password,
      phoneNumber,
      photo,
      roleID,
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

exports.employeeGet = async (req, res) => {
  try {
    const { pageSize, page } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;

    const Employees = await Employee.find()
      .skip(skip)
      .limit(limit)
      .populate("roleID group");

    const totalCount = await Employee.countDocuments();

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Employees,
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

exports.employeeGetDropDown = async (req, res) => {
  try {
    const { pageSize, page, searchKey } = req.query;

    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit || 0;
    const searched = searchKey || "";

    const query = {
      title: { $regex: new RegExp(searched, "i") }, // Case-insensitive search
    };

    const Employees = await Employee.find(query)
      .select("title")
      .skip(skip)
      .limit(limit);

    const totalCount = await Employee.countDocuments(query);

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Employees,
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

exports.employeeGetByName = async (req, res) => {
  try {
    const { fullName } = req.query;

    const Employees = await Employee.find({ fullName: fullName });

    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Employees._id,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.employeeGetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const Employee = await Employee.findById(id).populate("roleID group");
    res.status(200).json({
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: Employee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", code: 500, description: error.message });
  }
};

exports.employeeEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { addedDate, birthdayDate, fullName, phoneNumber, photo, roleID } =
      req.body;

    await Employee.findByIdAndUpdate(id, {
      $set: {
        addedDate,
        birthdayDate,
        fullName,
        phoneNumber,
        photo,
        roleID,
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

exports.employeeEditPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    await Employee.findByIdAndUpdate(id, {
      $set: {
        password,
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

exports.employeeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);

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
