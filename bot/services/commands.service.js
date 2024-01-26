const { inlinemenuBtn } = require("../helpers/inline-menu.helper");
const { InlineKeyboard } = require("grammy");
const Users = require("../../model/user");
const { menuBtn } = require("../helpers/menu.helper");
const mainMenu = require("../utils/main-menu");

const startService = async (ctx) => {
  const User = await Users.find({ telegramID: ctx.from.id });
  if (!User.length) {
    await ctx.reply(
      `<b>👋Assalomu alekum, <a href="tg://user?id=${ctx.from.id}">${
        ctx.from.first_name
      } ${
        ctx.from.last_name || ""
      }</a>. Bizning botimizga xush kelibsiz. Keling tanishib olaylik! Iltimos, ismingizni jo'nating✍️F</b>`,
      {
        parse_mode: "HTML",
      }
    );
    ctx.session.step = "auth";
  } else {
    await ctx.reply(
      `<b>Siz allaqachon ro'yhatdan o'tgansiz. Iltimos kuting, administratorlarimiz siz bilan tez orada bog'lanishadi📞</b>`,
      {
        parse_mode: "HTML",
      }
    );
    ctx.session.step = "user";
  }
};

const helpService = async (ctx) => {
  const shareURL = `https://t.me/abdulaziz_programmer`;
  const keyboard = new InlineKeyboard().url("Support", shareURL);
  await ctx.reply(
    `Qandaydir taklif yoki savollaringiz bormi❓\n \n Biz bilan bog'laning✅`,
    {
      parse_mode: "HTML",
      reply_markup: keyboard,
    }
  );
};

const shareService = async (ctx) => {
  const shareURL = `https://t.me/share/url?url=https://t.me/technolifesupportbot`;
  const keyboard = new InlineKeyboard().url("Share Bot", shareURL);
  await ctx.replyWithPhoto(
    "https://telegra.ph/file/b58bf5310e124e462572b.jpg",
    {
      caption: `Xurmatli foydalanuvchi, Do'stlaringiz, oila azolaringiz va yaqinlaringizga ham foydali bo'lishi va bizni qo'llab quvvatlash uchun bo'tni ularga ham jo'nating🚀`,
      parse_mode: "HTML",
      reply_markup: keyboard,
    }
  );
};

module.exports = { startService, shareService, helpService };
