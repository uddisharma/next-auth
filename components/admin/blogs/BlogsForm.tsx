"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { addBlog, updateBlog } from "@/actions/blogs";
import { uploadFile } from "@/actions/upload";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import Editor from "@/components/editor/editor";
import { defaultValue } from "@/lib/defaultValue";
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from 'next/image';
import { Loader2, Upload, X } from 'lucide-react';

interface BlogFormProps {
    blog?: {
        id: number;
        title: string;
        content: string;
        category: string;
        subCategory: string | null;
        published: boolean;
        image?: string | null;
        authorId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}

const BlogSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long").max(255, "Title must not exceed 255 characters"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    category: z.string().min(2, "Category is required").max(100, "Category must not exceed 100 characters"),
    subCategory: z.string().optional(),
    image: z.string().optional(),
    published: z.boolean(),
});

type BlogFormData = z.infer<typeof BlogSchema>;

export default function BlogForm({ blog }: BlogFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(blog?.image || "");
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const json = generateJSON(blog?.content ?? "", [StarterKit]);

    const form = useForm<BlogFormData>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: blog?.title || "",
            content: blog?.content || "",
            category: blog?.category || "",
            subCategory: blog?.subCategory || "",
            published: blog?.published || false,
            image: blog?.image || "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        form.setValue("image", imageUrl, { shouldValidate: true });
    }, [imageUrl, form]);

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        try {
            const blob = await uploadFile(formData);
            setImageUrl(blob.url);
            form.setValue("image", blob.url, { shouldValidate: true });
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload image");
            form.setError("image", { type: "manual", message: "Failed to upload image" });
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageRemove = () => {
        setImageUrl("");
        form.setValue("image", "", { shouldValidate: true });
    };

    const onSubmit = async (values: BlogFormData) => {
        setIsSubmitting(true);
        try {
            const updatedValues = { ...values, content: values.content, image: imageUrl };
            let result;
            if (blog) {
                result = await updateBlog(blog.id, updatedValues);
            } else {
                result = await addBlog(updatedValues);
            }

            if (result && ("error" in result || "message" in result)) {
                toast.error("Failed to submit blog");
                return;
            }

            router.push("/admin/blogs");
            router.refresh();
            toast.success(blog ? "Blog updated successfully" : "Blog saved successfully");
        } catch (error) {
            toast.error("Failed to submit blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full mx-auto pt-5">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter blog title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The title should be between 10 and 255 characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subCategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sub Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter subcategory (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Editor
                                            initialValue={json ?? defaultValue}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Featured Image</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-4">
                                            {imageUrl ? (
                                                <div className="relative w-40 h-40">
                                                    <Image
                                                        src={imageUrl || "/placeholder.svg"}
                                                        alt="Uploaded image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-md"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2"
                                                        onClick={handleImageRemove}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded-md">
                                                    <label htmlFor="image-upload" className="cursor-pointer">
                                                        <div className="flex flex-col items-center">
                                                            <Upload className="h-8 w-8 text-gray-400" />
                                                            <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                                                        </div>
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                            {isUploading && <Loader2 className="h-6 w-6 animate-spin" />}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Publish
                                        </FormLabel>
                                        <FormDescription>
                                            Make this blog post publicly available
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isSubmitting || isUploading || !form.formState.isValid}
                    className="w-fit flex justify-center bg-primary text-primary-foreground"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : blog ? (
                        "Update Blog"
                    ) : (
                        "Save Blog"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
