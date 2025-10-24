"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import React from 'react'
import FileUpload from "@/components/ui/fileUpload";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { blogSchema } from "@/schemas/blogSchema";
import { Label } from "@/components/ui/label";
import { z } from "zod";
const AddBlogPage = () => {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      image: null,
      title: "",
      subTitle: "",
      description: "",
      isPublished: false,
      category: null,
    },
  });
  const { formState: { errors } } = form;
  const onSubmit = async(data: z.infer<typeof blogSchema>) => {
    const blogData = { title: data.title, subTitle: data.subTitle, description: data.description, isPublished: data.isPublished, category: data.category };
    console.log(blogData);
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("blog", JSON.stringify(blogData));
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        toast.error("Failed to add blog");
        throw new Error(responseData.message || "Failed to add blog");
      }
      toast.success(responseData.message || "Blog added successfully");
      console.log("Blog added successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Blog</CardTitle>
        <CardDescription>Fill the form to add a new blog</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="w-2xl" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Image</FieldLabel>
                  <FileUpload
                    onFilesChange={(files) => {
                      const file = files[0]?.file || files[0];
                      field.onChange(file);
                    }}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    {...field}
                    placeholder="Type here"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="subTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="subTitle">Subtitle</FieldLabel>
                  <Input
                    id="subTitle"
                    {...field}
                    placeholder="Type here"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    {...field}
                    placeholder="Type here"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="isPublished"
              control={form.control}
              render={({ field }) => (
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="isPublished"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="isPublished">Publish Now</Label>
                </div>
              )}
            />
            <Button type="submit">Add Blog</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}


// const [image, setImage] = useState<File | null>(null);
// const [title, setTitle] = useState("");
// const [subTitle, setSubTitle] = useState("");
// const [description, setDescription] = useState("");
// const [isPublished, setIsPublished] = useState(false);
// const [category, setCategory] = useState("");

// const handleAddBlog = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   if (!image) {

//     return toast.error("Please upload an image");
//   }

//   const blog = { title, subTitle, description, category, isPublished };
//   const formData = new FormData();
//   formData.append("blog", JSON.stringify(blog));
//   formData.append("image", image);
//   const response = await fetch("/api/blogs", {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to add blog");
//   }

//   toast.success("Blog added successfully");

// };

// <form onSubmit={handleAddBlog} className="w-2xl">
//   <div className="bg-card flex flex-col gap-4 md:gap-6 m-4 md:m-10 p-4 md:p-10 rounded-lg shadow-md ">
//     <Field>
//       <FieldLabel>Upload Thumbnail</FieldLabel>
//       <FileUpload
//         onFilesChange={(files: File) => {
//           const file = files[0]?.file as File | null;
//           if (file instanceof File) {
//             setImage(file);
//           } else {
//             setImage(null);
//           }
//         }}
//       />
//     </Field>
//     <Field>
//       <FieldLabel htmlFor="title">Title</FieldLabel>
//       <Input
//         id="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Type here"
//         required
//       />
//     </Field>
//     <Field>
//       <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
//       <Input
//         id="subtitle"
//         value={subTitle}
//         onChange={(e) => setSubTitle(e.target.value)}
//         placeholder="Type here"
//         required
//       />
//     </Field>
//     <Field>
//       <FieldLabel>Blog Description</FieldLabel>
//       <Textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//     </Field>
//     <Field>
//       <FieldLabel>Blog category</FieldLabel>
//       <Select
//         value={category}
//         onValueChange={setCategory}
//         required
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select a Category" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Category</SelectLabel>
//             <SelectItem value="Technology">Technology</SelectItem>
//             <SelectItem value="Startup">Startup</SelectItem>
//             <SelectItem value="Lifestyle">Lifestyle</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </Field>
//     <div className="flex gap-2 items-center">
//       <Checkbox
//         checked={isPublished}
//         onCheckedChange={(checked) => setIsPublished(checked === true)}
//       />
//       <p>Publish Now</p>
//     </div>

//     <Button type="submit">Add BLog</Button>
//   </div>
// </form>

export default AddBlogPage