"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { locationOptions, VideoConferencingPlatform } from "@/lib/types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/lib/route-paths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIntegrationQueryFn, CreateEventMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/dashboard/loader";

const NewEventDialog = (props: { btnVariant?: string }) => {
  const { btnVariant } = props;

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: CreateEventMutationFn,
  });

  const { data: integrationData } = useQuery({
    queryKey: ["integration_check"],
    queryFn: checkIntegrationQueryFn,
  });

  const isGoogleMeetConnected = integrationData?.isConnected;

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      locationType: VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR,
      // isVisible: true,
    },
  });

  const onSubmit = (values: z.infer<typeof eventSchema>) => {
    createEvent(values, {
      onSuccess: () => {
        toast.success("Event created successfully");
        queryClient.invalidateQueries({ queryKey: ["event_list"] });
        setIsOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create event");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={btnVariant as any}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          New event type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new event type</DialogTitle>
          <DialogDescription>
            Create a new event type for your calendar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title">Event title</Label>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description">Description</Label>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Enter event description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <FormControl>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="locationType">Location</Label>
                  <FormControl>
                    <select
                      id="locationType"
                      {...field}
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                    >
                      {locationOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          disabled={!option.isAvailable}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader color="white" /> : "Create event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  locationType: z.nativeEnum(VideoConferencingPlatform),
  // isVisible: z.boolean(),  // TODO: Add this back in
});

export default NewEventDialog;