const isAdmin = async (ctx, next) => {
  const isAdmin = ctx.from.id;
  if (isAdmin == process.env.AdminID) return next();
};

module.exports = isAdmin;
