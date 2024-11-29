import User from "../models/user";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  const pageTitle = "Join";
  if(exists){
    return res.render("join", {
      pageTitle,
      errorMessage: "This username/email has already been taken.",
    });
  }
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove Account");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const check = (req, res) => res.send("Check User");
