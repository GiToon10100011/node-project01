import Video, { formHashtags } from "../models/video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("404", { error });
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
export const watch = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  res.render("watch", {
    pageTitle: video.title,
    video,
  });
};
export const getEdit = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  res.render("edit", {
    pageTitle: `Editing ${video.title}`,
    video,
  });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags
  //   .replace(/\s/g, "")
  //   .split(",")
  //   .map((tag) =>
  //     tag.startsWith("#")
  //       ? tag
  //       : `
  //   #${tag}`
  //   );
  // await video.save();
  return res.redirect(`/video/${id}`);
};
export const search = async (req, res) => {
  const { q } = req.query;
  let videos = [];
  if (q) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(q, "i"),
      },
    });
    return res.render("search", { pageTitle: `Search: ${q}`, videos });
  }
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
  // const video = new Video({
  //   title,
  //   description,
  //   hashtags: hashtags
  //     .replace(/\s/g, "")
  //     .split(",")
  //     .map((tag) => `#${tag}`),
  //   meta: {
  //     views: 0,
  //     rating: 0,
  //   },
  //   createdAt: Date.now(),
  // });
  // const dbVideo = await video.save();
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
