const { Keyboard } = require("grammy");
const loginSurnameService = async (ctx) => {
  await ctx.reply(`<b>Well, Now Please send me your surname</b>`, {
    parse_mode: "HTML",
  });

  ctx.session.step = "surname";
};

const loginPhoneService = async (ctx) => {
  await ctx.reply(`<b>Good, Now Please send me your Phone</b>`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard().row().requestContact("Send Contact").resized(),
  });

  ctx.session.step = "phone";
};

const loginCountryService = async (ctx) => {
  await ctx.reply(`<b>Well done, Where are you from</b>`, {
    parse_mode: "HTML",
  });

  ctx.session.step = "from";
};

const loginLastService = async (ctx) => {
  await ctx.reply(
    `<b>Well done,Our administrators will contacts you soon</b>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );

  ctx.session.step = "user";
};

module.exports = {
  loginPhoneService,
  loginSurnameService,
  loginCountryService,
  loginLastService,
};
