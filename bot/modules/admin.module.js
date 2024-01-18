const { Router } = require("@grammyjs/router");
const {
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
  ContactService
} = require("../services/admin.service");
const router = new Router((ctx) => ctx.session.step);
const adminStep = router.route("admin");

adminStep.on("message", async (ctx) => {
  if ("📊 Statistics" == ctx.message?.text) {
    adminStatisticsService(ctx);
  } else if ("📞 Contacts" == ctx.message?.text) {
    ContactService(ctx);
  }
});

adminStep.on("callback_query:data", async (ctx) => {
  // Daily Statistics
  if ("📊 Daily Statistics" == ctx.callbackQuery.data) {
    dailyStatistics(ctx);
  } else if ("⏪Previous Day" == ctx.callbackQuery.data) {
    previousDailyStatistics(ctx);
  } else if ("Next Day⏩" == ctx.callbackQuery.data) {
    nextDailyStatistics(ctx);
  }
  // Monthly Statistics
  else if ("📊 Monthly Statistics" == ctx.callbackQuery.data) {
    monthlyStatistics(ctx);
  } else if ("⏪Previous Month" == ctx.callbackQuery.data) {
    previousMonthlyStatistics(ctx);
  } else if ("Next Month⏩" == ctx.callbackQuery.data) {
    nextMonthlyStatistics(ctx);
  }
  // Yearly Statistics
  else if ("📊 Yearly Statistics" == ctx.callbackQuery.data) {
    yearlyStatistics(ctx);
  } else if ("⏪Previous Year" == ctx.callbackQuery.data) {
    previousYearlyStatistics(ctx);
  } else if ("Next Year⏩" == ctx.callbackQuery.data) {
    nextYearlyStatistics(ctx);
  }
});

module.exports = router;
