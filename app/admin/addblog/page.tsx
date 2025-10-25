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
import FileUpload from "@/components/ui/fileUpload";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { blogSchema } from "@/schemas/blogSchema";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { TiptapEditor } from "@/components/ui/tip-tap";

const AddBlogPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    setIsSubmitting(true);

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
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
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
                  <TiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Type here"
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Adding Blog..." : "Add Blog"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddBlogPage