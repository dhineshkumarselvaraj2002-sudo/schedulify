"use client"

import * as React from "react"
import { Calendar02 } from "@/components/ui/calendar-02"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarWidgetProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
  disabledDates?: (date: Date) => boolean;
  className?: string;
  showTimeSlots?: boolean;
  availableSlots?: string[];
  onTimeSlotSelect?: (time: string) => void;
  selectedTimeSlot?: string;
}

export function CalendarWidget({
  selectedDate,
  onDateSelect,
  disabledDates,
  className,
  showTimeSlots = false,
  availableSlots = [],
  onTimeSlotSelect,
  selectedTimeSlot,
}: CalendarWidgetProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate)
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(selectedTimeSlot)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onDateSelect?.(selectedDate)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onTimeSlotSelect?.(time)
  }

  // Mock time slots - replace with your actual data
  const timeSlots = availableSlots.length > 0 ? availableSlots : [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ]

  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar02
              selected={date}
              onSelect={handleDateSelect}
              disabled={disabledDates}
              className="w-auto"
            />
          </div>

          {/* Time Slots */}
          {showTimeSlots && date && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Available Times</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                      "text-sm",
                      selectedTime === time && "bg-blue-600 text-white"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Date & Time Summary */}
          {(date || selectedTime) && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Selected:</span>
              </div>
              {date && (
                <p className="text-sm text-gray-700">
                  Date: {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
              {selectedTime && (
                <p className="text-sm text-gray-700">
                  Time: {selectedTime}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Simple calendar for dashboard widgets
export function SimpleCalendarWidget({
  selectedDate,
  onDateSelect,
  className,
}: {
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Date Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar02
            selected={selectedDate}
            onSelect={onDateSelect}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  )
}
