const { Router } = require("@grammyjs/router");
const contacts = require("../../model/contact");
const {
  loginPhoneService,
  loginSurnameService,
  loginLastService,
} = require("../services/auth.service");
const router = new Router((ctx) => ctx.session.step);
const authStep = router.route("auth");
const authStep2 = router.route("surname");
const authStep3 = router.route("phone");
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
  await contacts.create({
    name: ctx.session.name,
    surname: ctx.session.surname,
    phoneNumber: ctx.session.number,
    status: "unsorted",
  });
  loginLastService(ctx);
});

user.on("message", async (ctx) => {
  await ctx.reply(
    `<b>You have already contacted please wait</b>`,
    {
      parse_mode: "HTML",
    }
  );
});

module.exports = router;
