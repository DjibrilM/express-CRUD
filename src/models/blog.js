import slug from "mongoose-slug-generator";
import mongoose from "mongoose";
mongoose.plugin(slug);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: "title" },
    description: {
      type: String,
      required: true,
    },
    BlogImage: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;
