const { getUser } = require("../service/auth");

async function restricttologgedinUserOnly(req, res, next) {
  const userUid = req.cookies?.Uid;
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {

  const userUid = req.cookies?.Uid;
  console.log("required id from ",userUid);
  const user = getUser(userUid);

  req.user = user;
  console.log("req, user " , user)
  next();
}

module.exports = {
  restricttologgedinUserOnly,
    checkAuth,

};
