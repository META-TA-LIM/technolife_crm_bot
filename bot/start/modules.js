const { session } = require("grammy");
const commandsModule = require("../modules/commands.module");
const authModule = require("../modules/auth.module");
const adminModule = require("../modules/admin.module");
const all = (bot) => {
  bot.use(session({ initial: () => ({ step: "start" }) }));

  bot.use(commandsModule);
  bot.use(authModule);
  bot.use(adminModule);
};
module.exports = all;
