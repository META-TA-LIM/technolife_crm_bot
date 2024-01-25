const { Router } = require("@grammyjs/router");
const User = require("../../model/user");
const Lid = require("../../model/lid");
const { menuBtn } = require("../helpers/menu.helper");
const mainMenu = require("../utils/main-menu");

const {
  loginPhoneService,
  loginSurnameService,
  loginLastService,
  loginCountryService,
  lidStatusService,
  lidLastService,
  lidTextService,
  lidStatusGet,
} = require("../services/auth.service");
const router = new Router((ctx) => ctx.session.step);
const authStep = router.route("auth");
const authStep2 = router.route("surname");
const authStep3 = router.route("phone");
const authStep4 = router.route("from");
const user = router.route("user");
const lidstatus = router.route("lidstatus");
const lidtext = router.route("lidtext");

authStep.on("message", async (ctx) => {
  ctx.session.name = ctx.message.text;
  loginSurnameService(ctx);
});

authStep2.on("message", async (ctx) => {
  ctx.session.surname = ctx.message.text;
  loginPhoneService(ctx);
});

authStep3.on("message", async (ctx) => {
  ctx.session.number = ctx.message.text || ctx.message?.contact?.phone_number;
  loginCountryService(ctx);
});

authStep4.on("message", async (ctx) => {
  ctx.session.from = ctx.message.text;
  await User.create({
    name: ctx.session.name,
    surname: ctx.session.surname,
    phoneNumber: ctx.session.number,
    from: ctx.session.from,
    telegramID: ctx.session.telegramID,
  });
  loginLastService(ctx);
});

user.on("message", async (ctx) => {
  if ("✏️ Create Lids" == ctx.message.text) {
    lidStatusService(ctx);
  } else if ("📃 My Lids" == ctx.message.text) {
    lidStatusGet(ctx);
  } else {
    await ctx.reply(`<b>Please select one of them</b>`, {
      parse_mode: "HTML",
      reply_markup: {
        ...menuBtn(mainMenu),
        resize_keyboard: true,
      },
    });
  }
});

lidstatus.on("message", async (ctx) => {
  if (ctx.message.text == "🔙Back") {
    await ctx.reply(`<b>Please select one of them to continue</b>`, {
      parse_mode: "HTML",
      reply_markup: {
        ...menuBtn(mainMenu),
        resize_keyboard: true,
      },
    });

    ctx.session.step = "user";
  } else {
    ctx.session.lidstatus = ctx.message.text;
    lidTextService(ctx);
  }
});

lidtext.on("message", async (ctx) => {
  if (ctx.message.text == "🔙Back") {
    lidStatusService(ctx);
  } else {
    ctx.session.lidtext = ctx.message.text;
    const UserGet = await User.find({ telegramID: ctx.from.id });

    await Lid.create({
      status: ctx.session.lidstatus,
      text: ctx.session.lidtext,
      userID: UserGet._id,
    });
    lidLastService(ctx);
  }
});

module.exports = router;
