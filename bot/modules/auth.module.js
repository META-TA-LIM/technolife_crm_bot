const { Router } = require("@grammyjs/router");
const User = require("../../model/user");
const Lid = require("../../model/lid");
const Status = require("../../model/status");

const {
  loginPhoneService,
  loginLastService,
} = require("../services/auth.service");
const router = new Router((ctx) => ctx.session.step);
const authStep = router.route("auth");
const authStepLast = router.route("phone");
const user = router.route("user");

authStep.on("message", async (ctx) => {
  ctx.session.fullname = ctx.message.text;
  loginPhoneService(ctx);
});

authStepLast.on("message", async (ctx) => {
  ctx.session.number = ctx.message.text || ctx.message?.contact?.phone_number;
  loginLastService(ctx);
  const user = await User.create({
    fullname: ctx.session.fullname,
    phoneNumber: ctx.session.number,
    telegramID: ctx.session.telegramID,
  });

  const lid = await Lid.create({
    seller: user._id,
  });
  await Status.findOneAndUpdate(
    { statusName: "incoming" },
    {
      $push: {
        lids: lid._id,
      },
    }
  );
});

user.on("message", async (ctx) => {
  await ctx.reply(
    `<b>Siz allaqachon ro'yhatdan o'tgansiz. Iltimos kuting, administratorlarimiz siz bilan tez orada bog'lanishadi📞</b>`,
    {
      parse_mode: "HTML",
    }
  );
  ctx.session.step = "user";
});

module.exports = router;
