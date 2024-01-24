const adminMenu = require("../utils/admin-menu");
const { menuBtn } = require("../helpers/menu.helper");
const { inlinemenuBtn } = require("../helpers/inline-menu.helper");
const statisticsMenu = require("../utils/statistics-menu");
const contacts = require("../../model/lid");
const { InlineKeyboard } = require("grammy");

const adminService = async (ctx) => {
  await ctx.reply(
    `<b>Welcome to Techno Life Qabul Bot's admin page. Please pick one of the given section to continue</b>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        ...menuBtn(adminMenu),
        resize_keyboard: true,
      },
    }
  );

  ctx.session.step = "admin";
};

// Statistics

const adminStatisticsService = async (ctx) => {
  const data = await contacts.find();
  const unsorteddata = await contacts.find({ status: "unsorted" });
  const sorteddata = await contacts.find({ status: "sorted" });

  await ctx.reply(
    `<b>Hi <a href="tg://user?id=${process.env.AdminID}">Admin</a> 👋, Welcome to TECHNO LIFE QABUL BOT Statistics Page 📊 \n \nAll contacts till now - ${data.length}\nUnsorted contacts - ${unsorteddata.length}\nSorted contacts - ${sorteddata.length}
    </b>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        ...inlinemenuBtn(statisticsMenu),
        resize_keyboard: true,
      },
    }
  );
};

// Statistics Daily
const dailyStatistics = async (ctx) => {
  const now = new Date();
  const todayStart = now.setHours(0, 0, 0, 0);
  const todayEnd = now.setHours(23, 59, 59, 999);
  const alldata = await contacts.find({
    createdAt: { $gte: todayStart, $lt: todayEnd },
  });
  const allunsorteddata = await contacts.find({
    createdAt: { $gte: todayStart, $lt: todayEnd },
    status: "unsorted",
  });
  const allsorteddata = await contacts.find({
    createdAt: { $gte: todayStart, $lt: todayEnd },
    status: "sorted",
  });

  await ctx.reply(
    `<b>Here is today's statistics📊. You can see another day's statistics by clicking ⏪previous or next⏩ buttons \n \n
    Contacts added today - ${alldata.length}
    Unsorted contacts - ${allunsorteddata.length}
    Sorted contacts - ${allsorteddata.length}
    </b>`,

    {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().row().text("⏪Previous Day"),
    }
  );
};

const previousDailyStatistics = async (ctx) => {
  if (!ctx.session.dayprev) {
    ctx.session.dayprev = 1;
  } else {
    ctx.session.dayprev += 1;
  }
  const now = new Date();
  const previousDayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - ctx.session.dayprev,
    0,
    0,
    0,
    0
  );
  const previousDayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - ctx.session.dayprev,
    23,
    59,
    59,
    999
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
  });

  const allunsortdata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
    status: "unsorted",
  });
  const allsortdata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
    status: "sorted",
  });

  await ctx.reply(
    `<b>Here is ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "Today"
    }'s statistics📊. You can see another day's statistics by clicking ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${alldata.length}\n
    Unsorted contacts of ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${allsortdata.length}
    Sorted contacts of ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${allunsortdata.length}
    </b>`,
    ctx.session.dayprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Day")
            .text("Next Day⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Day"),
        }
  );
};

const nextDailyStatistics = async (ctx) => {
  if (!ctx.session.dayprev) {
    ctx.session.dayprev = 1;
  } else {
    ctx.session.dayprev -= 1;
  }
  const now = new Date();
  const previousDayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - ctx.session.dayprev,
    0,
    0,
    0,
    0
  );
  const previousDayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - ctx.session.dayprev,
    23,
    59,
    59,
    999
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
  });

  const allsortdata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
    status: "sorted",
  });

  const allunsortdata = await contacts.find({
    createdAt: { $gte: previousDayStart, $lt: previousDayEnd },
    status: "unsorted",
  });

  await ctx.reply(
    `<b>Here is ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "Today"
    }'s statistics📊. You can see another day's statistics by clicking ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${alldata.length}
    \n
    Unsorted contacts of ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${allunsortdata.length}
    Sorted contacts of ${
      ctx.session.dayprev >= 1
        ? (previousDayStart + "").split("00")[0]
        : "today"
    } - ${allsortdata.length}
    </b>`,
    ctx.session.dayprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Day")
            .text("Next Day⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Day"),
        }
  );
};

// Statistics Monthly

const monthlyStatistics = async (ctx) => {
  const now = new Date();
  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const alldata = await contacts.find({
    createdAt: { $gte: monthStart, $lt: monthEnd },
  });
  const allsortdata = await contacts.find({
    createdAt: { $gte: monthStart, $lt: monthEnd },
    status: "sorted",
  });
  const allunsortdata = await contacts.find({
    createdAt: { $gte: monthStart, $lt: monthEnd },
    status: "unsorted",
  });

  await ctx.reply(
    `<b>Here is this month's statistics📊. You can see 
    another month's statistics by clicking ⏪previous or next⏩ buttons \n \n
    Contacts Statistics\nContacts joined this month - ${alldata.length}\n
    Unsorted Contacts - ${allunsortdata.length}
    Sorted Contacts - ${allsortdata.length}
    </b>`,
    {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().row().text("⏪Previous Month"),
    }
  );
};

const previousMonthlyStatistics = async (ctx) => {
  if (!ctx.session.monthprev) {
    ctx.session.monthprev = 1;
  } else {
    ctx.session.monthprev += 1;
  }
  const now = new Date();

  // Get the start and end of the previous month.
  const previousMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - ctx.session.monthprev,
    2
  );
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() - ctx.session.monthprev + 1,
    1
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
  });

  const allsortdata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
    status: "sorted",
  });

  const allunsortdata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
    status: "unsorted",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[previousMonthStart.getMonth()];
  await ctx.reply(
    `<b>Here is ${month}'s statistics📊. You can see another day's statistics by clicking 
    ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined in ${month}
     - ${alldata.length}\nUnsorted Contacts of ${month}
     - ${allunsortdata.length}\nSorted Contacts of ${month}
     - ${allsortdata.length}</b>`,
    ctx.session.monthprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Month")
            .text("Next Month⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Month"),
        }
  );
};

const nextMonthlyStatistics = async (ctx) => {
  if (!ctx.session.monthprev) {
    ctx.session.monthprev = 1;
  } else {
    ctx.session.monthprev -= 1;
  }
  const now = new Date();

  // Get the start and end of the previous month.
  const previousMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - ctx.session.monthprev,
    2
  );
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() - ctx.session.monthprev + 1,
    1
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
  });

  const allsorteddata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
    status: "sorted",
  });

  const allunsorteddata = await contacts.find({
    createdAt: { $gte: previousMonthStart, $lt: previousMonthEnd },
    status: "unsorted",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[previousMonthStart.getMonth()];
  await ctx.reply(
    `<b>Here is ${month}'s statistics📊. You can see another day's statistics by clicking 
    ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined in ${month} - ${alldata.length}\n 
    Unsorted contacts of ${month} - ${allunsorteddata.length}\n 
    Sorted contacts of ${month} - ${allsorteddata.length}
    </b>`,
    ctx.session.monthprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Month")
            .text("Next Month⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Month"),
        }
  );
};

// Statistics Yearly
const yearlyStatistics = async (ctx) => {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 2);
  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
  const alldata = await contacts.find({
    createdAt: { $gte: yearStart, $lt: yearEnd },
  });
  const allunsortdata = await contacts.find({
    createdAt: { $gte: yearStart, $lt: yearEnd },
    status: "unsorted",
  });
  const allsortdata = await contacts.find({
    createdAt: { $gte: yearStart, $lt: yearEnd },
    status: "sorted",
  });

  await ctx.reply(
    `<b>Here is ${yearStart.getFullYear()}'s statistics📊. You can see another year's statistics by clicking ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined ${yearStart.getFullYear()} - ${
      alldata.length
    }\n
    Unsorted of ${yearStart.getFullYear()} - ${allunsortdata.length}
    Sorted of ${yearStart.getFullYear()} - ${allsortdata.length}</b>`,
    {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().row().text("⏪Previous Year"),
    }
  );
};

const previousYearlyStatistics = async (ctx) => {
  if (!ctx.session.yearprev) {
    ctx.session.yearprev = 1;
  } else {
    ctx.session.yearprev += 1;
  }
  const now = new Date();
  const previousYearStart = new Date(
    now.getFullYear() - ctx.session.yearprev,
    0,
    2
  );
  const previousYearEnd = new Date(
    now.getFullYear() - ctx.session.yearprev + 1,
    0,
    1
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
  });

  const allsortdata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
  });

  const allunsortdata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
  });

  await ctx.reply(
    `<b>Here is ${previousYearStart.getFullYear()}'s statistics📊. You can see another day's statistics by clicking 
    ⏪previous or next⏩ buttons \n \n🏥Contacts Statistics\nContacts joined in ${previousYearStart.getFullYear()} - ${
      alldata.length
    }\nUnsorted of ${previousYearStart.getFullYear()} - ${
      allunsortdata.length
    }\nSorted of ${previousYearStart.getFullYear()} - ${
      allsortdata.length
    }</b>`,
    ctx.session.yearprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Year")
            .text("Next Year⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Year"),
        }
  );
};

const nextYearlyStatistics = async (ctx) => {
  if (!ctx.session.yearprev) {
    ctx.session.yearprev = 1;
  } else {
    ctx.session.yearprev -= 1;
  }
  const now = new Date();
  const previousYearStart = new Date(
    now.getFullYear() - ctx.session.yearprev,
    0,
    2
  );
  const previousYearEnd = new Date(
    now.getFullYear() - ctx.session.yearprev + 1,
    0,
    1
  );

  const alldata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
  });

  const allunsortdata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
    status: "unsorted",
  });

  const allsortdata = await contacts.find({
    createdAt: { $gte: previousYearStart, $lt: previousYearEnd },
    status: "sorted",
  });

  await ctx.reply(
    `<b>Here is ${previousYearStart.getFullYear()}'s statistics📊. You can see another day's statistics by clicking ⏪previous or next⏩ buttons \n \nContacts Statistics\nContacts joined in ${previousYearStart.getFullYear()} - ${
      alldata.length
    }\n
    Unsorted of ${previousYearStart.getFullYear()} - ${allunsortdata.length}\n
    Sorted of ${previousYearStart.getFullYear()} - ${
      allsortdata.length
    }\n </b>`,
    ctx.session.yearprev >= 1
      ? {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard()
            .row()
            .text("⏪Previous Year")
            .text("Next Year⏩"),
        }
      : {
          parse_mode: "HTML",
          reply_markup: new InlineKeyboard().row().text("⏪Previous Year"),
        }
  );
};

// Contact Service
const ContactService = async (ctx) => {
  await ctx.reply(
    `Hi <a href="tg://user?id=${process.env.AdminID}">Admin</a> 👋, Welcome to TECHNO LIFE QABUL BOT Contacts Page `,
    {
      parse_mode: "HTML",
    }
  );
  ctx.session.step = "clinicCrud";
};

module.exports = {
  adminService,
  adminStatisticsService,
  dailyStatistics,
  previousDailyStatistics,
  nextDailyStatistics,
  monthlyStatistics,
  previousMonthlyStatistics,
  nextMonthlyStatistics,
  yearlyStatistics,
  previousYearlyStatistics,
  nextYearlyStatistics,
  ContactService,
};
