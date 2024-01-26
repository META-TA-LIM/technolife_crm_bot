const { Keyboard } = require("grammy");

const loginPhoneService = async (ctx) => {
  await ctx.reply(
    `<b>Ajoyib, Endi menga siz bilan bog'lanish uchun telefon raqamingizni jo'nating</b>`,
    {
      parse_mode: "HTML",
      reply_markup: new Keyboard()
        .row()
        .requestContact("Send Contact")
        .resized(),
    }
  );

  ctx.session.step = "phone";
};

const loginLastService = async (ctx) => {
  await ctx.reply(
    `<b>Tabriklayman! Siz muvaffaqaaiyatli ro'yhatdan o'tdingiz. Iltimos kuting, administratorlarimiz siz bilan tez orada bog'lanishadi📞</b>`,
    {
      parse_mode: "HTML",
    }
  );

  ctx.session.step = "user";
};

module.exports = {
  loginPhoneService,
  loginLastService,
};
