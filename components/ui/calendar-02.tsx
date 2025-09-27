"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface Calendar02Props {
  className?: string;
  numberOfMonths?: number;
  defaultMonth?: Date;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: "single" | "range";
  disabled?: (date: Date) => boolean;
  showOutsideDays?: boolean;
}

export function Calendar02({
  className,
  numberOfMonths = 1,
  defaultMonth,
  selected,
  onSelect,
  mode = "single",
  disabled,
  showOutsideDays = true,
  ...props
}: Calendar02Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    selected || new Date()
  )

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onSelect?.(selectedDate)
  }

  return (
    <div className={cn("w-full", className)}>
      <Calendar
        mode={mode}
        defaultMonth={defaultMonth || date}
        numberOfMonths={numberOfMonths}
        selected={date}
        onSelect={handleSelect}
        disabled={disabled}
        showOutsideDays={showOutsideDays}
        className="rounded-lg border shadow-sm"
        {...props}
      />
    </div>
  )
}

// Export the Calendar02 component
export default Calendar02
