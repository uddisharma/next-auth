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
import { LeadsSchema, LeadsSchemaData } from "@/schemas";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
