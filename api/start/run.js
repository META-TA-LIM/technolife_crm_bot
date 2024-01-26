const { connect } = require("mongoose");
const Admin = require("../../model/admin");
const run = async (app) => {
  try {
    await connect(process.env.ConnectionString);

    const admin = await Admin.find();
    if (!admin.length) {
      await Admin.create({
        phoneNumber: "+998995252284",
        password:
          "$2a$10$4GFd8yGZjTjwiazICt3Us.UyvZwKEn9cyoN63ZJSkShYMMzGjxhr6",
      });
    }
    console.log("MongoDB-ga muvaffaqiyatli ulandik");
  } catch (error) {
    console.error("MongoDB-ga ulanishda xatolik: ", error?.message);
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(PORT);
  });
};

module.exports = run;
