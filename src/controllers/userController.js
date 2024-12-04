import User from "../models/user";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { email, username, password, passwordConfirm, name, location } =
    req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  const pageTitle = "Join";
  if (exists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "This username/email has already been taken.",
    });
  }
  if (password !== passwordConfirm) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Passwords doesn't match.",
    });
  }

  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: error._message });
  }
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove Account");
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const userExists = await User.findOne({ username, snsType: false });
  if (!userExists) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exist.",
    });
  }
  const ok = await bcrypt.compare(password, userExists.password);
  if (!ok) {
    return res.status(404).render("login", {
      pageTitle,
      errorMessage: "Invalid Password.",
    });
  }
  console.log("User Logged");
  req.session.loggedIn = true;
  req.session.loggedUser = userExists;
  res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const check = (req, res) => res.send("Check User");
export const triggerGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: "false",
    scope: "read:user user:email",
  };
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseUrl}?${params}`;
  res.redirect(finalURL);
};
export const callbackGithub = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseUrl}?${params}`;
  const tokenReq = await (
    await fetch(finalURL, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenReq) {
    const { access_token } = tokenReq;
    const apiUrl = "https://api.github.com";
    const userReq = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailReq = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const userMail = emailReq.find((email) => email.primary && email.verified);
    if (!userMail) return res.redirect("/login");
    const existingUser = await User.findOne({ email: userMail.email });
    console.log(userReq);
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.loggedUser = existingUser;
      console.log(req.session);
      return res.redirect("/");
    } else {
      const user = await User.create({
        name: userReq.login,
        avatarUrl: userReq.avatar_url,
        username: userReq.username,
        email: userMail.email,
        snsType: true,
        password: "",
        location: "",
      });
      req.session.loggedIn = true;
      req.session.loggedUser = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};
