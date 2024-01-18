const permission = require("./permission.routes");
const role = require("./role.routes");
const board = require("./board.routes");
const course = require("./course.routes");
const employee = require("./employee.routes");
const group = require("./group.routes");
const groupAttendance = require("./groupAttendance.routes");
const groupSchedule = require("./groupSchedule.routes");
const lid = require("./lid.routes");
const minio = require("./minio.routes");

module.exports = [
  permission,
  role,
  board,
  course,
  employee,
  group,
  groupAttendance,
  groupSchedule,
  lid,
  minio,
];
