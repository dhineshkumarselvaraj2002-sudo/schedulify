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
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { locationOptions, VideoConferencingPlatform } from "@/lib/types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/lib/route-paths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIntegrationQueryFn, CreateEventMutationFn, getUserAvailabilityQueryFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/dashboard/loader";

// Event type options
const eventTypeOptions = [
  {
    value: "ONE_ON_ONE",
    label: "One-on-one",
    description: "1 host → 1 invitee",
    examples: "Good for coffee chats, 1:1 interviews, etc."
  },
  {
    value: "GROUP",
    label: "Group",
    description: "1 host → Multiple invitees",
    examples: "Webinars, online classes, etc."
  },
  {
    value: "ROUND_ROBIN",
    label: "Round robin",
    description: "Rotating hosts → 1 invitee",
    examples: "Distribute meetings between team members"
  },
];

const NewEventDialog = (props: { btnVariant?: string }) => {
  const { btnVariant } = props;

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: CreateEventMutationFn,
  });

  const { data: integrationData } = useQuery({
    queryKey: ["integration_check", VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR],
    queryFn: () => checkIntegrationQueryFn(VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR),
  });

  const { data: availabilityData } = useQuery({
    queryKey: ["user_availability"],
    queryFn: getUserAvailabilityQueryFn,
  });

  const isGoogleMeetConnected = (integrationData as any)?.isConnected;
  
  // Check if selected location is integrated
  const checkLocationIntegration = (locationType: string) => {
    switch (locationType) {
      case VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR:
        return isGoogleMeetConnected;
      case VideoConferencingPlatform.ZOOM_MEETING:
        // Add zoom integration check when available
        return true; // For now, assume zoom is always available
      case VideoConferencingPlatform.MICROSOFT_TEAMS:
        // Add teams integration check when available
        return true; // For now, assume teams is always available
      default:
        return true; // For other location types like "In Person"
    }
  };

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventType: "ONE_ON_ONE",
      title: "",
      description: "",
      duration: 30,
      locationType: VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR,
      availability: "",
      host: "",
      userLimit: 10,
      // isVisible: true,
    },
  });

  const nextPage = () => {
    // Validate current page before proceeding
    if (currentPage === 1) {
      const eventType = form.getValues("eventType");
      if (!eventType) {
        form.setError("eventType", { message: "Please select an event type" });
        return;
      }
    }
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setCurrentPage(1);
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof eventSchema>) => {
    // Check if the selected location is integrated
    if (!checkLocationIntegration(values.locationType)) {
      form.setError("locationType", {
        type: "manual",
        message: "This location type is not integrated. Please connect the integration first."
      });
      return;
    }

    const eventData = {
      ...values,
      description: values.description || "",
    };
    createEvent(eventData as any, {
      onSuccess: () => {
        toast.success("Event created successfully");
        queryClient.invalidateQueries({ queryKey: ["event_list"] });
        resetForm();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create event");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setCurrentPage(1);
      }
    }}>
      <DialogTrigger asChild>
        <Button
          variant={btnVariant as any}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Event Type
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px] bg-white border border-gray-200 shadow-xl rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Create New Event Type</DialogTitle>
          <DialogDescription className="text-gray-600">
            Create a new event type for your calendar and start scheduling meetings.
          </DialogDescription>
          
          {/* Enhanced Progress Indicator */}
          <div className="flex items-center justify-center mt-4 mb-2 px-4">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full max-w-md">
              {[
                { step: 1, label: "Event Type", icon: "📅", shortLabel: "Type" },
                { step: 2, label: "Details", icon: "⚙️", shortLabel: "Details" }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg font-semibold transition-all duration-300 ${
                        currentPage >= item.step
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                          : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {currentPage >= item.step ? item.step : item.icon}
                    </div>
                    <span className={`text-xs font-medium mt-1 sm:mt-2 text-center transition-colors duration-300 ${
                      currentPage >= item.step ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">{item.shortLabel}</span>
                    </span>
                  </div>
                  {index < 1 && (
                    <div
                      className={`w-8 sm:w-16 h-1 mx-2 sm:mx-4 rounded-full transition-all duration-300 ${
                        currentPage > item.step 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Page 1: Event Type Selection */}
            {currentPage === 1 && (
              <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Choose Event Type</h3>
                  <p className="text-sm sm:text-base text-gray-600">Select the type of event you want to create</p>
                </div>
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {eventTypeOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`relative p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg group ${
                                field.value === option.value
                                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg shadow-blue-100'
                                  : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50'
                              }`}
                              onClick={() => field.onChange(option.value)}
                            >
                              {/* Selection indicator */}
                              <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                field.value === option.value
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300 group-hover:border-blue-400'
                              }`}>
                                {field.value === option.value && (
                                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              
                              <div className="space-y-2 sm:space-y-3 pr-6 sm:pr-8">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">{option.label}</div>
                                <div className="text-xs sm:text-sm text-gray-600 font-medium">{option.description}</div>
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                                  {option.examples}
                                </div>
                              </div>
                              
                              {/* Hover effect overlay */}
                              <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                                field.value === option.value 
                                  ? 'bg-blue-500 bg-opacity-5' 
                                  : 'bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5'
                              }`} />
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Page 2: Event Details */}
            {currentPage === 2 && (
              <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Event Details</h3>
                  <p className="text-sm sm:text-base text-gray-600">Configure your event settings and preferences</p>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                          📝
                        </span>
                        <span className="hidden sm:inline">Basic Information</span>
                        <span className="sm:hidden">Basic Info</span>
                      </h4>
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Event Title</Label>
                            <FormControl>
                              <Input
                                id="title"
                                placeholder="e.g., 15-Minute Meeting"
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                            <FormControl>
                              <Textarea
                                id="description"
                                placeholder="Brief description of what this meeting is about"
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                          ⏱️
                        </span>
                        <span className="hidden sm:inline">Duration & Settings</span>
                        <span className="sm:hidden">Duration</span>
                      </h4>
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration (minutes)</Label>
                            <FormControl>
                              <Input
                                id="duration"
                                type="number"
                                placeholder="30"
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Column - Availability & Location */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                          📅
                        </span>
                        <span className="hidden sm:inline">Availability & Host</span>
                        <span className="sm:hidden">Availability</span>
                      </h4>
                      
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <Label htmlFor="availability" className="text-sm font-medium text-gray-700">Availability</Label>
                            <FormControl>
                              <select
                                id="availability"
                                {...field}
                                className="mt-2 block w-full rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white px-3 py-2 text-sm border-gray-300 transition-all duration-200"
                              >
                                <option value="">Select availability</option>
                                {availabilityData?.availability?.days?.map((day: any) => (
                                  <option key={day.day} value={day.day}>
                                    {day.day} ({day.startTime} - {day.endTime})
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="host"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="host" className="text-sm font-medium text-gray-700">Host</Label>
                            <FormControl>
                              <select
                                id="host"
                                {...field}
                                className="mt-2 block w-full rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white px-3 py-2 text-sm border-gray-300 transition-all duration-200"
                              >
                                <option value="">Select host</option>
                                <option value="current_user">Current User</option>
                                {availabilityData?.availability?.days?.filter((day: any) => day.isAvailable).map((day: any) => (
                                  <option key={`host_${day.day}`} value={`host_${day.day}`}>
                                    Host for {day.day}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                          📍
                        </span>
                        <span className="hidden sm:inline">Location & Integration</span>
                        <span className="sm:hidden">Location</span>
                      </h4>
                      
                      <FormField
                        control={form.control}
                        name="locationType"
                        render={({ field }) => {
                          const isLocationIntegrated = checkLocationIntegration(field.value);
                          return (
                            <FormItem>
                              <Label htmlFor="locationType" className="text-sm font-medium text-gray-700">
                                Location
                                {!isLocationIntegrated && (
                                  <span className="ml-2 text-xs text-red-500">(Integration Required)</span>
                                )}
                              </Label>
                              <FormControl>
                                <div className="relative">
                                  <select
                                    id="locationType"
                                    {...field}
                                    className={`mt-2 block w-full rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white px-3 py-2 text-sm transition-all duration-200 ${
                                      !isLocationIntegrated 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300'
                                    }`}
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
                                  {!isLocationIntegrated && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                              {!isLocationIntegrated && (
                                <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                                  This location requires integration. Please connect the integration in the Integrations page first.
                                </p>
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    </div>

                    {/* Conditional field for Group event type */}
                    {form.watch("eventType") === "GROUP" && (
                      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center">
                          <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                            👥
                          </span>
                          <span className="hidden sm:inline">Group Settings</span>
                          <span className="sm:hidden">Group</span>
                        </h4>
                        
                        <FormField
                          control={form.control}
                          name="userLimit"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="userLimit" className="text-sm font-medium text-gray-700">Maximum Participants</Label>
                              <FormControl>
                                <Input
                                  id="userLimit"
                                  type="number"
                                  placeholder="10"
                                  className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="pt-6 sm:pt-8 border-t border-gray-200 bg-gray-50 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                {currentPage === 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    className="w-full sm:flex-1 h-10 sm:h-12 text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevPage}
                    className="w-full sm:flex-1 h-10 sm:h-12 text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Back</span>
                    <span className="sm:hidden">Previous</span>
                  </Button>
                )}
                
                {currentPage < totalPages ? (
                  <Button 
                    type="button" 
                    onClick={nextPage}
                    className="w-full sm:flex-1 h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Continue</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isPending || !checkLocationIntegration(form.watch("locationType"))}
                    className="w-full sm:flex-1 h-10 sm:h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
                  >
                    {isPending ? <Loader color="white" /> : (
                      <>
                        <span className="hidden sm:inline">Create Event Type</span>
                        <span className="sm:hidden">Create</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const eventSchema = z.object({
  eventType: z.enum(["ONE_ON_ONE", "GROUP", "ROUND_ROBIN"]),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  locationType: z.nativeEnum(VideoConferencingPlatform),
  availability: z.string().min(1, "Availability is required"),
  host: z.string().min(1, "Host is required"),
  userLimit: z.number().min(1, "User limit must be at least 1").optional(),
  // isVisible: z.boolean(),  // TODO: Add this back in
}).refine((data) => {
  // If event type is GROUP, userLimit is required
  if (data.eventType === "GROUP") {
    return data.userLimit !== undefined && data.userLimit > 0;
  }
  return true;
}, {
  message: "User limit is required for Group events",
  path: ["userLimit"]
});

export default NewEventDialog;