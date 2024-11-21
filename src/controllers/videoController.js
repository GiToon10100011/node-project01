export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
export const watch = (req, res) => {
  console.log(req.params.id);
  res.render("watch", { pageTitle: "Watch", params: req.params.id });
};
export const edit = (req, res) =>
  res.send(
    `<!DOCTYPE HTML><head><title>Node.js</title></head><body><h1>Edit Video: #${req.params.id}</h1></body>`
  );
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
