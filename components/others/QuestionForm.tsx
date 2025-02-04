"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { addQuestion, updateQuestion } from "@/actions/questions";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionFormValues, QuestionSchema } from "@/public/schemas";
import { Card, CardContent } from "@/components/ui/card";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

interface QuestionFormProps {
  question?: {
    id: number;
    text: string;
    sequence: number;
    questionType: "SINGLE_SELECT" | "MULTIPLE_SELECT" | "TEXT";
    required: boolean;
    isActive: boolean;
    options: {
      id: number;
      text: string;
      sequence: number;
    }[];
  };
}

export default function QuestionForm({ question }: QuestionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      text: question?.text || "",
      sequence: question?.sequence || 1,
      questionType: question?.questionType || "SINGLE_SELECT",
      required: question?.required || false,
      isActive: question?.isActive || true,
      options: question?.options || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const { watch } = form;
  const questionType = watch("questionType");

  const handleSubmit = async (data: QuestionFormValues) => {
    setIsSubmitting(true);
    try {
      if (question) {
        const updatedQuestion = await updateQuestion(question.id, data);
        if ("message" in updatedQuestion) {
          toast.error(updatedQuestion.message as string);
          return;
        }
        toast.success("Question updated successfully");
      } else {
        const addedQuestion = await addQuestion(data);
        if ("message" in addedQuestion) {
          toast.error(addedQuestion.message as string);
          return;
        }
        toast.success("Question added successfully");
      }
      router.push("/admin/questions");
      router.refresh();
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter question text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the main text of your question here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sequence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sequence</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter sequence"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the order of this question in the survey.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SINGLE_SELECT">
                            Single Select
                          </SelectItem>
                          <SelectItem value="MULTIPLE_SELECT">
                            Multiple Select
                          </SelectItem>
                          <SelectItem value="TEXT">Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Choose the type of response for this question.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Required</FormLabel>
                      <FormDescription>
                        Make this question mandatory.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>
                        Include this question in the survey.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {(questionType === "MULTIPLE_SELECT" ||
          questionType === "SINGLE_SELECT") && (
          <Card>
            <CardContent className="pt-6">
              <Label className="mb-2 block">Options</Label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 mt-2"
                >
                  <DragHandleDots2Icon className="cursor-move" />
                  <Input
                    {...form.register(`options.${index}.text`)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    onClick={() => index > 0 && move(index, index - 1)}
                    variant="outline"
                    size="sm"
                    disabled={index === 0}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      index < fields.length - 1 && move(index, index + 1)
                    }
                    variant="outline"
                    size="sm"
                    disabled={index === fields.length - 1}
                  >
                    Down
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({ text: "", sequence: fields.length + 1 })
                }
                className="mt-2"
              >
                Add Option
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end mt-5 w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit flex justify-center bg-btnblue text-white px-4 py-2"
          >
            {isSubmitting
              ? "Submitting..."
              : question
                ? "Update Question"
                : "Add Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
