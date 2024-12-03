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
  const userExists = await User.findOne({ username });
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
  req.session.user = userExists;
  res.redirect("/");
};
export const logout = (req, res) => res.send("Logout");
export const check = (req, res) => res.send("Check User");
