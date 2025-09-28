"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, X, Save, Calendar, Trash2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import DatePicker from "./date-picker";
import { format, isSameDay } from "date-fns";
import { useStore } from "@/store/store";
import { toast } from "sonner";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DateAvailability {
  date: Date;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

const DateAvailabilityForm = () => {
  const { user } = useStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateAvailabilities, setDateAvailabilities] = useState<DateAvailability[]>([]);
  const [timeGap, setTimeGap] = useState(30);

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

  const timeSlots = generateTimeSlots(timeGap);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    // Check if date already exists
    const existingIndex = dateAvailabilities.findIndex(da => isSameDay(da.date, date));
    if (existingIndex === -1) {
      // Add new date availability
      setDateAvailabilities(prev => [...prev, {
        date,
        isAvailable: true,
        timeSlots: [{ startTime: "09:00", endTime: "17:00" }]
      }]);
    }
  };

  const toggleDateAvailability = (date: Date) => {
    setDateAvailabilities(prev => 
      prev.map(da => 
        isSameDay(da.date, date) 
          ? { ...da, isAvailable: !da.isAvailable }
          : da
      )
    );
  };

  const addTimeSlot = (date: Date) => {
    setDateAvailabilities(prev => 
      prev.map(da => 
        isSameDay(da.date, date) 
          ? { ...da, timeSlots: [...da.timeSlots, { startTime: "09:00", endTime: "17:00" }] }
          : da
      )
    );
  };

  const removeTimeSlot = (date: Date, slotIndex: number) => {
    setDateAvailabilities(prev => 
      prev.map(da => 
        isSameDay(da.date, date) 
          ? { ...da, timeSlots: da.timeSlots.filter((_, index) => index !== slotIndex) }
          : da
      )
    );
  };

  const updateTimeSlot = (date: Date, slotIndex: number, field: "startTime" | "endTime", value: string) => {
    setDateAvailabilities(prev => 
      prev.map(da => 
        isSameDay(da.date, date) 
          ? { 
              ...da, 
              timeSlots: da.timeSlots.map((slot, index) => 
                index === slotIndex ? { ...slot, [field]: value } : slot
              )
            }
          : da
      )
    );
  };

  const removeDateAvailability = (date: Date) => {
    setDateAvailabilities(prev => prev.filter(da => !isSameDay(da.date, date)));
  };

  const getDateAvailability = (date: Date) => {
    return dateAvailabilities.find(da => isSameDay(da.date, date));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleSave = () => {
    if (!user?.username) {
      toast.error("User not authenticated");
      return;
    }

    // Here you would typically save to backend
    toast.success(`Date-specific availability saved for ${user.name}`);
  };

  return (
    <div className="space-y-6">
      {/* User Info Header - Exact from Image */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">{user?.name}'s Date-Specific Availability</h3>
            <p className="text-sm text-blue-700">@{user?.username} • Set availability for specific dates</p>
          </div>
        </div>
      </div>

      {/* Date Selection - Exact Layout from Image */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium text-gray-700">Select Date</Label>
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              placeholder="Choose a date to set availability"
              className="w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-sm text-gray-500">Time gap:</Label>
            <Input
              type="number"
              min="15"
              max="120"
              step="15"
              value={timeGap}
              onChange={(e) => setTimeGap(parseInt(e.target.value) || 30)}
              className="w-16 h-8 text-center text-sm"
            />
            <span className="text-sm text-gray-500">min</span>
          </div>
        </div>
      </div>

      {/* Selected Date Availability */}
      {selectedDate && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <CardTitle className="text-lg text-blue-900">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </CardTitle>
                  <p className="text-sm text-blue-700">Set your availability for this date</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDateAvailability(selectedDate)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const dateAvailability = getDateAvailability(selectedDate);
              if (!dateAvailability) return null;

              return (
                <div className="space-y-4">
                  {/* Availability Toggle */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={dateAvailability.isAvailable ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDateAvailability(selectedDate)}
                      className={cn(
                        dateAvailability.isAvailable 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "border-gray-300"
                      )}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {dateAvailability.isAvailable ? "Available" : "Not Available"}
                    </Button>
                    {dateAvailability.isAvailable && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {dateAvailability.timeSlots.length} time slot{dateAvailability.timeSlots.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>

                  {/* Time Slots */}
                  {dateAvailability.isAvailable && (
                    <div className="space-y-3">
                      {dateAvailability.timeSlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2">
                            <Label className="text-sm font-medium text-gray-700">From:</Label>
                            <select
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(selectedDate, slotIndex, "startTime", e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {formatTime(time)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Label className="text-sm font-medium text-gray-700">To:</Label>
                            <select
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(selectedDate, slotIndex, "endTime", e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {formatTime(time)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {dateAvailability.timeSlots.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(selectedDate, slotIndex)}
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
                        onClick={() => addTimeSlot(selectedDate)}
                        className="w-full border-dashed border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add another time slot
                      </Button>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* All Set Dates */}
      {dateAvailabilities.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Scheduled Availability</h3>
          <div className="space-y-3">
            {dateAvailabilities.map((dateAvailability) => (
              <Card key={dateAvailability.date.toISOString()} className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <div>
                        <CardTitle className="text-base">
                          {format(dateAvailability.date, "EEEE, MMM d, yyyy")}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              dateAvailability.isAvailable 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-600"
                            )}
                          >
                            {dateAvailability.isAvailable ? "Available" : "Not Available"}
                          </Badge>
                          {dateAvailability.isAvailable && (
                            <span className="text-sm text-gray-500">
                              {dateAvailability.timeSlots.length} time slot{dateAvailability.timeSlots.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDateAvailability(dateAvailability.date)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                {dateAvailability.isAvailable && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {dateAvailability.timeSlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-2 text-sm">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-700">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Save Button - Exact from Image */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-base"
        >
          <Save className="w-5 h-5 mr-2" />
          Save availability for {user?.name}
        </Button>
      </div>
    </div>
  );
};

export default DateAvailabilityForm;
