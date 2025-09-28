"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Plus, X, Save, Copy, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { dayMapping } from "@/lib/availability";
import { updateUserAvailabilityMutationFn, getUserAvailabilityQueryFn } from "@/lib/api";
import { Loader } from "@/components/dashboard/loader";
import WeeklyCalendarView from "./weekly-calendar-view";
import { useStore } from "@/store/store";

// Schema for validation
const availabilitySchema = z.object({
  timeGap: z.number().min(15).max(120),
  days: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      isAvailable: z.boolean(),
    })
  ),
});

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

const WeeklyAvailabilityForm = () => {
  const { user } = useStore();
  const [days, setDays] = useState<DayAvailability[]>([]);

  const form = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      timeGap: 30,
      days: [],
    },
  });

  // Fetch user's current availability
  const { data: availabilityData, isLoading, error } = useQuery({
    queryKey: ['userAvailability', user?.username],
    queryFn: getUserAvailabilityQueryFn,
    enabled: !!user?.username,
  });

  const { mutate: updateAvailability, isPending } = useMutation({
    mutationFn: updateUserAvailabilityMutationFn,
  });

  // Initialize days from API data or default values
  useEffect(() => {
    if (availabilityData?.availability) {
      const apiDays = availabilityData.availability.days.map(day => ({
        day: day.day,
        isAvailable: day.isAvailable,
        timeSlots: [{ startTime: day.startTime, endTime: day.endTime }]
      }));
      setDays(apiDays);
      form.setValue("timeGap", availabilityData.availability.timeGap);
      form.setValue("days", apiDays.map(day => ({
        day: day.day,
        startTime: day.timeSlots[0]?.startTime || "09:00",
        endTime: day.timeSlots[0]?.endTime || "17:00",
        isAvailable: day.isAvailable,
      })));
    } else if (!isLoading && !availabilityData) {
      // Set default values if no data exists
      const defaultDays = [
        { day: "MONDAY", isAvailable: true, timeSlots: [{ startTime: "09:00", endTime: "17:00" }] },
        { day: "TUESDAY", isAvailable: true, timeSlots: [{ startTime: "09:00", endTime: "17:00" }] },
        { day: "WEDNESDAY", isAvailable: true, timeSlots: [{ startTime: "09:00", endTime: "17:00" }] },
        { day: "THURSDAY", isAvailable: true, timeSlots: [{ startTime: "09:00", endTime: "17:00" }] },
        { day: "FRIDAY", isAvailable: true, timeSlots: [{ startTime: "09:00", endTime: "17:00" }] },
        { day: "SATURDAY", isAvailable: false, timeSlots: [] },
        { day: "SUNDAY", isAvailable: false, timeSlots: [] },
      ];
      setDays(defaultDays);
      form.setValue("days", defaultDays.map(day => ({
        day: day.day,
        startTime: day.timeSlots[0]?.startTime || "09:00",
        endTime: day.timeSlots[0]?.endTime || "17:00",
        isAvailable: day.isAvailable,
      })));
    }
  }, [availabilityData, isLoading, form]);

  // Generate time slots based on time gap
  const generateTimeSlots = (timeGap: number) => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += timeGap) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(form.watch("timeGap") || 30);

  const toggleDayAvailability = (dayIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].isAvailable = !newDays[dayIndex].isAvailable;
    
    if (newDays[dayIndex].isAvailable && newDays[dayIndex].timeSlots.length === 0) {
      newDays[dayIndex].timeSlots = [{ startTime: "09:00", endTime: "17:00" }];
    }
    
    setDays(newDays);
  };

  const addTimeSlot = (dayIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].timeSlots.push({ startTime: "09:00", endTime: "17:00" });
    setDays(newDays);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].timeSlots.splice(slotIndex, 1);
    setDays(newDays);
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: "startTime" | "endTime", value: string) => {
    const newDays = [...days];
    newDays[dayIndex].timeSlots[slotIndex][field] = value;
    setDays(newDays);
  };

  const copyToAllDays = (sourceDayIndex: number) => {
    const sourceDay = days[sourceDayIndex];
    const newDays = days.map((day, index) => {
      if (index !== sourceDayIndex) {
        return {
          ...day,
          isAvailable: sourceDay.isAvailable,
          timeSlots: sourceDay.isAvailable ? [...sourceDay.timeSlots] : [],
        };
      }
      return day;
    });
    setDays(newDays);
  };

  const handleSubmit = () => {
    if (!user?.username) {
      toast.error("User not authenticated");
      return;
    }

    const formData = {
      timeGap: form.getValues("timeGap"),
      days: days.map(day => ({
        day: day.day,
        startTime: day.timeSlots[0]?.startTime || "09:00",
        endTime: day.timeSlots[0]?.endTime || "17:00",
        isAvailable: day.isAvailable,
      })),
    };

    updateAvailability(formData, {
      onSuccess: (response) => {
        toast.success(response.message || `Availability updated for ${user.name}`);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update availability");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader color="white" />
        <span className="ml-2 text-gray-600">Loading availability for {user?.name}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load availability data</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Gap Setting - Calendly Style */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium text-gray-700">Time between meetings</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="15"
                max="120"
                step="15"
                value={form.watch("timeGap")}
                onChange={(e) => form.setValue("timeGap", parseInt(e.target.value) || 30)}
                className="w-16 h-8 text-center text-sm"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Recommended: 15-30 min
          </Badge>
        </div>
      </div>

      {/* Calendar Overview - Calendly Style */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Weekly Overview</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            <Calendar className="w-4 h-4 mr-1" />
            View Calendar
          </Button>
        </div>
        <WeeklyCalendarView 
          days={days}
          onDayClick={(dayIndex) => {
            const element = document.getElementById(`day-${dayIndex}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Days of Week - Calendly Style */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900">Set your availability</h3>
        {days.map((day, dayIndex) => (
          <div key={day.day} id={`day-${dayIndex}`} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Day Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={day.isAvailable}
                    onCheckedChange={() => toggleDayAvailability(dayIndex)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <div>
                    <Label className="text-sm font-semibold text-gray-900 cursor-pointer">
                      {dayMapping[day.day as keyof typeof dayMapping]}
                    </Label>
                    {day.isAvailable && (
                      <p className="text-xs text-green-600 mt-0.5">Available</p>
                    )}
                  </div>
                </div>
                {day.isAvailable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToAllDays(dayIndex)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy to all
                  </Button>
                )}
              </div>
            </div>

            {/* Day Content */}
            {day.isAvailable ? (
              <div className="p-4">
                <div className="space-y-3">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Label className="text-xs font-medium text-gray-700">From</Label>
                        <select
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, "startTime", e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Label className="text-xs font-medium text-gray-700">To</Label>
                        <select
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, "endTime", e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      {day.timeSlots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(dayIndex)}
                    className="w-full border-dashed border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add another time slot
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Not available on this day</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Button - Calendly Style */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          {isPending ? (
            <>
              <Loader color="white" />
              <span className="ml-2">Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save availability
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WeeklyAvailabilityForm;
