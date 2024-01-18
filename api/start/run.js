const run = async (app) => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(PORT);
  });
};

module.exports = run;
