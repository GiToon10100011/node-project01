import Video from "../models/video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", { error });
  }

  //에러가 발생했을때와 데이터를 찾아왔을때
  // await videoModel
  // .find()
  // .then((videos) => {
  //   console.log("videos", videos);
  //   return res.render("home", { pageTitle: "Home", videos: [] });
  // })
  // .catch((e) => console.error(e));
  // console.log("start");
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
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    hashtags: hashtags
      .replace(/\s/g, "")
      .split(",")
      .map((tag) => `#${tag}`),
    meta: {
      views: 0,
      rating: 0,
    },
    createdAt: Date.now(),
  });
  const dbVideo = await video.save();
  return res.redirect("/");
};
export const deleteVideo = (req, res) => res.send("Delete Video");
