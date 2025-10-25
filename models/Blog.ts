import mongoose, { model, models } from 'mongoose';

export interface IBlog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  isPublished: boolean;
  publishedAt: Date;
  image: string;
  imageId?: string; // ImageKit file ID for potential deletion
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  image: { type: String },
  imageId: { type: String }, // Store ImageKit file ID
  category: { type: String }
}, { timestamps: true });

const Blog =  models?.Blog || model<IBlog>("Blog", blogSchema);

export default Blog;
