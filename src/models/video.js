import mongoose from "mongoose";

// export const formHashtags = (hashtags) => {
//   return hashtags
//     .replace(/\s/g, "")
//     .split(",")
//     .map((tag) =>
//       tag.startsWith("#")
//         ? tag
//         : `
// #${tag}`
//     );
// };

const videoSchema = new mongoose.Schema({
  title: { type: String, maxLength: 80, required: true, uppercase: true },
  description: { minLength: 10, type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  fileUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags
//     .join()
//     .replace(/\s/g, "")
//     .split(",")
//     .map((tag) =>
//       tag.startsWith("#")
//         ? tag
//         : `
// #${tag}`
//     );
// });

videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags
    .replace(/\s/g, "")
    .split(",")
    .map((tag) =>
      tag.startsWith("#")
        ? tag
        : `
#${tag}`
    );
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
