const { Keyboard } = require("grammy");
const { menuBtn } = require("../helpers/menu.helper");
const mainMenu = require("../utils/main-menu");
const Lid = require("../../model/lid");
const User = require("../../model/user");

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
    reply_markup: {
      remove_keyboard: true,
    },
  });

  ctx.session.step = "from";
};

const loginLastService = async (ctx) => {
  await ctx.reply(`<b>Congratulations! You have successfully registered</b>`, {
    parse_mode: "HTML",
  });

  await ctx.reply(`<b>Please select one of them to continue</b>`, {
    parse_mode: "HTML",
    reply_markup: {
      ...menuBtn(mainMenu),
      resize_keyboard: true,
    },
  });

  ctx.session.step = "user";
};

const lidStatusService = async (ctx) => {
  await ctx.reply(
    `<b>Alright, to create lid fist please send it's status</b>`,
    {
      parse_mode: "HTML",
      reply_markup: new Keyboard().row().text("🔙Back").resized(),
    }
  );

  ctx.session.step = "lidstatus";
};

const lidTextService = async (ctx) => {
  await ctx.reply(`<b>Well done, now send text for lid</b>`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard().row().text("🔙Back").resized(),
  });

  ctx.session.step = "lidtext";
};

const lidLastService = async (ctx) => {
  await ctx.reply(`<b>Your lid successfully created</b>`, {
    parse_mode: "HTML",
    reply_markup: {
      ...menuBtn(mainMenu),
      resize_keyboard: true,
    },
  });

  ctx.session.step = "user";
};

const lidStatusGet = async (ctx) => {
  try {
    const user = await User.find({ telegramID: ctx.from.id });
    const lidGet = await Lid.find({ userID: user._id });

    for (const element of lidGet) {
      let date = "";
      const formattedDate = new Date(element.createdAt);
      const day = formattedDate.getDate();
      const month = formattedDate.getMonth() + 1; // Months are zero-based
      const year = formattedDate.getFullYear();

      const formattedDateString = `${day}/${month}/${year}`;
      await ctx.reply(
        `<b>📍Status: ${element.status}\n💬Text: ${element.text}\n📅Date: ${formattedDateString}</b>`,
        {
          parse_mode: "HTML",
        }
      );
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately, e.g., send an error message to the user
    await ctx.reply("An error occurred while fetching lid information.");
  }
};

module.exports = {
  loginPhoneService,
  loginSurnameService,
  loginCountryService,
  loginLastService,
  lidStatusService,
  lidTextService,
  lidLastService,
  lidStatusGet,
};
