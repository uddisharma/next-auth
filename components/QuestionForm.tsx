"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/form";
import { addQuestion, updateQuestion } from "@/actions/questions";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { QuestionFormValues, QuestionSchema } from "@/schemas";

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

  const { watch, setValue } = form;
  const questionType = watch("questionType");
  const options = watch("options") || [];

  const addOption = () => {
    setValue("options", [
      ...options,
      { text: "", sequence: options.length + 1 },
    ]);
  };

  const removeOption = (index: number) => {
    setValue(
      "options",
      options.filter((_: { text: string; sequence: number }, i: number) => i !== index)
    );
  };

  const handleSubmit = async (data: QuestionFormValues) => {
    setIsSubmitting(true);
    try {
      if (question) {
        const addedQuestion = await updateQuestion(question.id, data);
        if ('message' in addedQuestion) {
          toast.error(addedQuestion.message as string);
          return;
        }
        toast.success("Question updated successfully");
      } else {
        const addedQuestion = await addQuestion(data);
        if ('message' in addedQuestion) {
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
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter question text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Required</FormLabel>
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
              <FormLabel>Active</FormLabel>
            </FormItem>
          )}
        />
        {(questionType == "MULTIPLE_SELECT" || questionType == "SINGLE_SELECT") && (
          <div>
            <Label>Options</Label>
            {options.map((option: any, index: number) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index].text = e.target.value;
                    setValue("options", updatedOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  type="button"
                  onClick={() => removeOption(index)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addOption} className="mt-2">
              Add Option
            </Button>
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? "Submitting..."
            : question
              ? "Update Question"
              : "Add Question"}
        </Button>
      </form>
    </Form>
  );
}
