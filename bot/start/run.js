const { connect } = require("mongoose");
const Admin = require("../../model/admin");

const start = async (bot) => {
  try {
    await connect(process.env.ConnectionString);

    const admin = await Admin.find();
    if (!admin.length) {
      await Admin.create({
        phoneNumber: "admin",
        password: "password",
      });
    }
    console.log("MongoDB-ga muvaffaqiyatli ulandik");
  } catch (error) {
    console.error("MongoDB-ga ulanishda xatolik: ", error?.message);
  }
  bot.catch((e) => {
    console.log(e.message);
  });

  bot.start();
};

module.exports = start;
