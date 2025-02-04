"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { subscribe } from "@/actions/leads";
import { toast } from "sonner";
import { LeadsSchema, LeadsSchemaData } from "@/public/schemas";

export function SubscriptionForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LeadsSchemaData>({
    resolver: zodResolver(LeadsSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  function onSubmit(values: LeadsSchemaData) {
    startTransition(() => {
      subscribe(values).then((res) => {
        if (!res?.success) {
          toast.error(res.message);
        } else {
          setIsOpen(false);
          toast.success(res.message);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white text-lg">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="h-14 bg-white text-black placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white text-lg">
                  Contact Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your number"
                    className="h-14 bg-white text-black placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-14 text-[#1B2537] bg-[#EBE086] hover:bg-[#EBE086]/90 text-lg font-semibold"
          size="lg"
        >
          {isPending ? "Submitting..." : "Let's Go!"}
        </Button>
      </form>
    </Form>
  );
}
