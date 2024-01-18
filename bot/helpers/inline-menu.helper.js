const { InlineKeyboard } = require("grammy");

const inlinemenuBtn = (mainMenu) => {
  const mainMenuBtn = new InlineKeyboard();

  for (let i = 0; i < mainMenu.length; i++) {
    if (i % 2 === 0 && i !== 0) {
      mainMenuBtn.row();
    }
    mainMenuBtn.text(mainMenu[i].name ? mainMenu[i].name : mainMenu[i]);
  }

  return mainMenuBtn;
};

module.exports = {
  inlinemenuBtn,
};
