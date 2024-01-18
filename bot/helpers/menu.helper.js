const {Keyboard} = require("grammy");

const menuBtn = (mainMenu) => {
  const mainMenuBtn = new Keyboard();

  for (let i = 0; i < mainMenu.length; i++) {
    if (i % 2 === 0 && i !== 0) {
      mainMenuBtn.row();
    }
    mainMenuBtn.text(mainMenu[i].name ? mainMenu[i].name : mainMenu[i]);
  }

  return mainMenuBtn;
};

module.exports = {
  menuBtn,
};
