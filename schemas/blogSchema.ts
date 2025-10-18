import { z } from "zod";

// Client-safe file validation
const fileSchema = z.custom<File>(
  (val) => {
    if (typeof window === "undefined") return true; // Skip validation on server
    return val instanceof File;
  },
  { message: "Image is required" }
);

export const blogSchema = z.object({
  image: fileSchema
    .nullable()
    .refine((file) => file !== null, { message: "Image is required" }),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  subTitle: z
    .string()
    .min(5, { message: "Subtitle must be at least 5 characters long" })
    .max(150, { message: "Subtitle must be at most 150 characters long" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" })
    .max(5000, { message: "Description must be at most 5000 characters long" }),
  category: z
    .enum(["Technology", "Startup", "Lifestyle"])
    .nullable()
    .refine((val) => val !== null, { message: "Category is required" })
    .optional(),
  isPublished: z.boolean().optional(),
});
