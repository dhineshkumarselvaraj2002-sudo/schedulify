"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AdvancedCalendarProps {
  placeholder?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  showTimePicker?: boolean;
  timeValue?: string;
  onTimeChange?: (time: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function AdvancedCalendar({
  placeholder = "Pick a date",
  selected,
  onSelect,
  disabled,
  className,
  showTimePicker = false,
  timeValue = "",
  onTimeChange,
  minDate,
  maxDate,
}: AdvancedCalendarProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(selected)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onSelect?.(selectedDate)
    if (!showTimePicker) {
      setOpen(false)
    }
  }

  const handleTimeChange = (time: string) => {
    onTimeChange?.(time)
  }

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              if (disabled) return disabled(date)
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            initialFocus
          />
          {showTimePicker && date && (
            <div className="border-t p-3">
              <label className="text-sm font-medium mb-2 block">Time</label>
              <input
                type="time"
                value={timeValue}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Multi-month calendar component
export function MultiMonthCalendar({
  numberOfMonths = 2,
  selected,
  onSelect,
  disabled,
  className,
}: {
  numberOfMonths?: number;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(selected)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onSelect?.(selectedDate)
  }

  return (
    <div className={cn("w-full", className)}>
      <Calendar
        mode="single"
        defaultMonth={date}
        numberOfMonths={numberOfMonths}
        selected={date}
        onSelect={handleSelect}
        disabled={disabled}
        className="rounded-lg border shadow-sm"
      />
    </div>
  )
}

// Date range picker component
export function DateRangeCalendar({
  selected,
  onSelect,
  disabled,
  className,
}: {
  selected?: { from: Date; to?: Date };
  onSelect?: (range: { from: Date; to?: Date } | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}) {
  const [dateRange, setDateRange] = React.useState<{ from: Date; to?: Date } | undefined>(selected)

  const handleSelect = (range: { from: Date; to?: Date } | undefined) => {
    setDateRange(range)
    onSelect?.(range)
  }

  return (
    <div className={cn("w-full", className)}>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        disabled={disabled}
        className="rounded-lg border shadow-sm"
      />
    </div>
  )
}
