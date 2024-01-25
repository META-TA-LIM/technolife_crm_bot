const { Router } = require("@grammyjs/router");
const User = require("../../model/user");
const {
  loginPhoneService,
  loginSurnameService,
  loginLastService,
  loginCountryService,
} = require("../services/auth.service");
const router = new Router((ctx) => ctx.session.step);
const authStep = router.route("auth");
const authStep2 = router.route("surname");
const authStep3 = router.route("phone");
const authStep4 = router.route("from");
const user = router.route("user");

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
  
});

module.exports = router;
