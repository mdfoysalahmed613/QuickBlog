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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import React, { useState } from 'react'
import FileUpload from "@/components/ui/fileUpload";
import { Field, FieldLabel } from "@/components/ui/field";

const AddBlogPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState("");

  const handleAddBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {

      return toast.error("Please upload an image");
    }

    const blog = { title, subTitle, description, category, isPublished };
    const formData = new FormData();
    formData.append("blog", JSON.stringify(blog));
    formData.append("image", image);
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add blog");
    }

    toast.success("Blog added successfully");

  };

  return (
    <form onSubmit={handleAddBlog} className="w-2xl">
      <div className="bg-card flex flex-col gap-4 md:gap-6 m-4 md:m-10 p-4 md:p-10 rounded-lg shadow-md ">
        <Field>
          <FieldLabel>Upload Thumbnail</FieldLabel>
          <FileUpload
            onFilesChange={(files: File) => {
              const file = files[0]?.file as File | null;
              if (file instanceof File) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
          <Input
            id="subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Type here"
            required
          />
        </Field>
        <Field>
          <FieldLabel>Blog Description</FieldLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Blog category</FieldLabel>
          <Select
            value={category}
            onValueChange={setCategory}
            required
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
        </Field>
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={isPublished}
            onCheckedChange={(checked) => setIsPublished(checked === true)}
          />
          <p>Publish Now</p>
        </div>

        <Button type="submit">Add BLog</Button>
      </div>
    </form>
  )
}

export default AddBlogPage