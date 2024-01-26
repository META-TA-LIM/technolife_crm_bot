const auth = require("./auth.routes");
const lid = require("./lid.routes");
const user = require("./user.routes");
const status = require("./status.routes");

module.exports = [auth, lid, user, status];
