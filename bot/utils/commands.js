const commands = async (bot) => {
  await bot.api.setMyCommands([
    { command: "start", description: "Starting the bot" },
    { command: "share", description: "Share with your loved people" },
    { command: "help", description: "Help and Support" },
  ]);
};

module.exports = commands;
