import mongoose from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  isPublished?: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  image?: string;
  category?: string;
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
  category: { type: String }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
