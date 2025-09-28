"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { dayMapping } from "@/lib/availability";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

interface WeeklyCalendarViewProps {
  days: DayAvailability[];
  onDayClick?: (dayIndex: number) => void;
  onTimeSlotClick?: (dayIndex: number, slotIndex: number) => void;
  className?: string;
}

const WeeklyCalendarView = ({ 
  days, 
  onDayClick, 
  onTimeSlotClick,
  className 
}: WeeklyCalendarViewProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDayStatus = (day: DayAvailability) => {
    if (!day.isAvailable) return { status: 'unavailable', color: 'bg-gray-100', text: 'Unavailable' };
    if (day.timeSlots.length === 0) return { status: 'no-slots', color: 'bg-yellow-100', text: 'No time slots' };
    return { status: 'available', color: 'bg-green-100', text: 'Available' };
  };

  const getTotalHours = (day: DayAvailability) => {
    if (!day.isAvailable || day.timeSlots.length === 0) return 0;
    
    return day.timeSlots.reduce((total, slot) => {
      const start = new Date(`2000-01-01T${slot.startTime}`);
      const end = new Date(`2000-01-01T${slot.endTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return total + diffHours;
    }, 0);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Calendar Container - Calendly Style */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-7 gap-4">
        {days.map((day, dayIndex) => {
          const dayStatus = getDayStatus(day);
          const totalHours = getTotalHours(day);
          const isSelected = selectedDay === dayIndex;

          return (
            <div 
              key={day.day}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md min-h-[120px] flex flex-col",
                isSelected && "ring-2 ring-blue-500 bg-blue-50 border-blue-300",
                dayStatus.status === 'available' && "bg-green-50 border-green-200 hover:bg-green-100",
                dayStatus.status === 'unavailable' && "bg-gray-50 border-gray-200 hover:bg-gray-100",
                dayStatus.status === 'no-slots' && "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
              )}
              onClick={() => {
                setSelectedDay(dayIndex);
                onDayClick?.(dayIndex);
              }}
            >
              {/* Day Header */}
              <div className="text-center mb-3">
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {dayMapping[day.day as keyof typeof dayMapping]}
                </div>
                <div className="w-6 h-6 mx-auto mt-2 rounded-full flex items-center justify-center">
                  {dayStatus.status === 'available' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {dayStatus.status === 'unavailable' && (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  )}
                  {dayStatus.status === 'no-slots' && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              {day.isAvailable && day.timeSlots.length > 0 && (
                <div className="space-y-1 mt-2">
                  {day.timeSlots.slice(0, 2).map((slot, slotIndex) => (
                    <div 
                      key={slotIndex}
                      className="text-xs bg-white rounded px-2 py-1 border border-green-300 text-center cursor-pointer hover:bg-green-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTimeSlotClick?.(dayIndex, slotIndex);
                      }}
                    >
                      {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                    </div>
                  ))}
                  {day.timeSlots.length > 2 && (
                    <div className="text-xs text-green-600 text-center font-medium bg-green-100 rounded px-2 py-1">
                      +{day.timeSlots.length - 2} more
                    </div>
                  )}
                </div>
              )}

              {/* Status Text */}
              <div className="text-center mt-auto">
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded",
                  dayStatus.status === 'available' && "text-green-700 bg-green-100",
                  dayStatus.status === 'unavailable' && "text-gray-600 bg-gray-100",
                  dayStatus.status === 'no-slots' && "text-yellow-700 bg-yellow-100"
                )}>
                  {dayStatus.text}
                </span>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Summary Stats - Calendly Style */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">
              {days.filter(day => day.isAvailable).length}
            </div>
            <div className="text-sm text-gray-600">Available Days</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">
              {days.reduce((total, day) => total + getTotalHours(day), 0).toFixed(1)}h
            </div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xl font-bold text-gray-900">
              {days.reduce((total, day) => total + day.timeSlots.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Time Slots</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
