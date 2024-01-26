const start = async (bot) => {
  bot.catch((e) => {
    console.log(e.message);
  });

  bot.start();
};

module.exports = start;
