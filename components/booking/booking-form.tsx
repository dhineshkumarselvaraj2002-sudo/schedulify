"use client";

import { z } from "zod";
import { addMinutes, parseISO } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { useBookingState } from "@/hooks/use-booking-state";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { CheckIcon, ExternalLink, Users } from "lucide-react";
import { scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/dashboard/loader";

const BookingForm = (props: { eventId: string; duration: number }) => {
  const { eventId, duration } = props;
  const [meetLink, setMeetLink] = useState("");

  const { selectedDate, isSuccess, selectedSlot, handleSuccess, next } =
    useBookingState();

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  const bookingFormSchema = z.object({
    guestName: z.string().min(1, "Name is required"),
    guestEmail: z.string().email("Invalid email address"),
    additionalInfo: z.string().optional(),
  });

  type BookingFormData = z.infer<typeof bookingFormSchema>;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      additionalInfo: "",
    },
  });

  // Only show form if user has clicked "Next" after selecting time
  if (!next) {
    return null;
  }

  const onSubmit = (values: BookingFormData) => {
    if (!eventId || !selectedSlot || !selectedDate) return;
    // Decode the selected slot to get the slotDate
    // (e.g., "2025-03-20T14:00:00.000Z")
    const decodedSlotDate = decodeURIComponent(selectedSlot);

    // Parse the slotDate into a Date object using date-fns
    const startTime = parseISO(decodedSlotDate);

    // Calculate the end time by adding the
    // duration of event (in minutes)
    // to the start time
    const endTime = addMinutes(startTime, duration);

    const payload = {
      ...values,
      eventId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
    console.log("Form Data:", payload);

    if (isPending) return;

    mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
        setMeetLink(response.data.meetLink);
        handleSuccess(true);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Failed to schedule event");
      },
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Information</h2>
          <p className="text-gray-600 text-sm">Provide your details to complete the booking</p>
        </div>
      </div>
      
      {isSuccess ? (
        // Success Message Component
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            You're all set!
          </h2>
          <p className="text-gray-600 mb-6">
            Your meeting has been scheduled successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Meeting link:</p>
            <p className="text-sm font-medium text-blue-600 break-all">{meetLink}</p>
          </div>
          <a href={meetLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Google Meet
            </Button>
          </a>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              name="guestName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700">
                    Name *
                  </Label>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      className="mt-1"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              name="guestEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      className="mt-1"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Info Field */}
            <FormField
              name="additionalInfo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700">
                    Additional notes
                  </Label>
                  <FormControl>
                    <Textarea
                      placeholder="Please share anything that will help prepare for our meeting."
                      className="mt-1 min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              disabled={isPending} 
              type="submit" 
              className="w-full h-12 text-base font-medium"
            >
              {isPending ? (
                <div className="flex items-center">
                  <Loader color="white" />
                  <span className="ml-2">Scheduling...</span>
                </div>
              ) : (
                "Schedule Meeting"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default BookingForm;
