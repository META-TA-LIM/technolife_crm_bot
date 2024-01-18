const isAuth = async (ctx, status, next) => {
  const isAdmin = ctx.from.id;
  if (isAdmin != process.env.AdminID && status == true) return next();
};

module.exports = isAuth;
