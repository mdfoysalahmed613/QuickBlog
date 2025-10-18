import mongoose, { model, models } from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  image: string;
  imageId?: string; // ImageKit file ID for potential deletion
  category: string;
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
  imageId: { type: String }, // Store ImageKit file ID
  category: { type: String }
});

const Blog =  models?.Blog || model<IBlog>("Blog", blogSchema);

export default Blog;
