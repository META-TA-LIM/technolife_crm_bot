const { Composer, Keyboard, InputFile, InlineKeyboard } = require("grammy");
const { adminService } = require("../services/admin.service");
const {
  startService,
  shareService,
  helpService,
} = require("../services/commands.service");

const bot = new Composer();

// Command Start
bot.command("start", async (ctx) => {
  if (ctx.from.id == process.env.AdminID) {
    adminService(ctx);
  } else {
    startService(ctx);
  }
  ctx.session.telegramID = ctx.from.id;
});

// Command Help
bot.command("help", helpService);

// Command share
bot.command("share", shareService);

module.exports = bot;
