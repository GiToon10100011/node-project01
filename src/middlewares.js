import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Youtube";
  //외부에서 링크로 바로 접근하게 될 경우를 방지하기 위해 유효성 검사를 추가
  res.locals.loggedUser = req.session.loggedUser || {};
  console.log(req.session.loggedUser);
  next();
};

//로그인이 되지 않았는데 로그인을 했을때만 사용할 수 있는 기능들을 막자.
export const protectedRoutingMiddleware = (req, res, next) => {
  if (req.session.loggedIn) return next();
  else return res.redirect("/login");
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) return next();
  else return res.redirect("/");
};

export const uploadAvatars = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});
export const uploadVideos = multer({
  dest: "uploads/videos",
  // limits: { fileSize: 10000000 },
});
