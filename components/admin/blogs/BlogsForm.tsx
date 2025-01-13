"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { addBlog, updateBlog } from "@/actions/blogs";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogSchema, BlogFormData } from "@/schemas";
import Editor from "@/components/editor/editor";
import { defaultValue } from "@/lib/defaultValue";

interface BlogFormProps {
    blog?: {
        id: bigint;
        title: string;
        content: string;
        category: string;
        subCategory: string | null;
        published: boolean;
        image?: string;
    };
}

export default function BlogForm({ blog }: BlogFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [content, setContent] = useState(blog?.content || "");
    const router = useRouter();


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
    });

    const onSubmit = async (values: BlogFormData) => {
        setIsSubmitting(true);
        try {
            const updatedValues = { ...values, content };
            if (blog) {
                const data = await updateBlog(blog.id, updatedValues);
                if ("message" in data) {
                    toast.error(data.message as string);
                    return;
                }
            } else {
                const data = await addBlog(updatedValues);
                if ("message" in data) {
                    toast.error(data.message as string);
                    return;
                }
            }
            router.push("/admin/blogs");
            router.refresh();
            toast.success("Blog submitted successfully");
        } catch (error) {
            toast.error("Failed to submit blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Content</FormLabel>
                    <Editor
                        initialValue={content ? {
                            type: 'doc',
                            content: [
                                {
                                    type: 'paragraph',
                                    text: content
                                }
                            ]
                        } : defaultValue}
                        onChange={setContent}
                    />
                </FormItem>
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
                                <Input placeholder="Enter sub category (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Published</FormLabel>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Submitting..." : blog ? "Update Blog" : "Add Blog"}
                </Button>
            </form>
        </Form>
    );
}
