const videos = [
  {
    id: 1,
    title: "First Video",
    createdAt: "2 mins ago",
    views: 59,
    comments: 2,
    ratings: 5,
  },
  {
    id: 2,
    title: "Second Video",
    createdAt: "2 mins ago",
    views: 49,
    comments: 2,
    ratings: 5,
  },
  {
    id: 3,
    title: "Third Video",
    createdAt: "2 mins ago",
    views: 59,
    comments: 2,
    ratings: 5,
  },
];
export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  console.log(req.params.id);
  const video = videos[req.params.id - 1];
  res.render("watch", {
    pageTitle: `Watching ${video.title}`,
    video,
  });
};
export const getEdit = (req, res) =>
  res.render("edit", {
    pageTitle: `Editing ${videos[req.params.id - 1].title}`,
    video: videos[req.params.id - 1],
  });
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/video/${id}`);
};
export const search = (req, res) => res.send("Search Video");
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    id: videos.length + 1,
    title,
    createdAt: "Just Now",
    views: 0,
    comments: 0,
    ratings: 0,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
export const deleteVideo = (req, res) => res.send("Delete Video");
