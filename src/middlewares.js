export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Youtube";
  res.locals.loggedUser = req.session.loggedUser;
  console.log(new Date().toLocaleTimeString(), res.locals);
  next();
};
