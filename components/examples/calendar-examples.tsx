"use client"

import * as React from "react"
import { Calendar02 } from "@/components/ui/calendar-02"
import { AdvancedCalendar, MultiMonthCalendar, DateRangeCalendar } from "@/components/ui/advanced-calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"

export function CalendarExamples() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [selectedRange, setSelectedRange] = React.useState<{ from: Date; to?: Date } | undefined>()
  const [timeValue, setTimeValue] = React.useState("09:00")

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar Components</h1>
        <p className="text-gray-600 mt-2">Examples of shadcn Calendar usage in your application</p>
      </div>

      {/* Basic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Basic Calendar
          </CardTitle>
          <CardDescription>
            Simple single date selection calendar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar02
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="max-w-sm mx-auto"
          />
          {selectedDate && (
            <p className="text-sm text-gray-600 mt-4 text-center">
              Selected: {selectedDate.toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Multi-Month Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Multi-Month Calendar
          </CardTitle>
          <CardDescription>
            Calendar showing multiple months for better planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MultiMonthCalendar
            numberOfMonths={2}
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="max-w-2xl mx-auto"
          />
        </CardContent>
      </Card>

      {/* Advanced Calendar with Time Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Advanced Calendar with Time
          </CardTitle>
          <CardDescription>
            Calendar with time picker for precise scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <AdvancedCalendar
              placeholder="Select date and time"
              selected={selectedDate}
              onSelect={setSelectedDate}
              showTimePicker={true}
              timeValue={timeValue}
              onTimeChange={setTimeValue}
            />
            {selectedDate && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Selected: {selectedDate.toLocaleDateString()} at {timeValue}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Date Range Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Selection</CardTitle>
          <CardDescription>
            Select a range of dates for events or availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateRangeCalendar
            selected={selectedRange}
            onSelect={setSelectedRange}
            className="max-w-sm mx-auto"
          />
          {selectedRange && (
            <p className="text-sm text-gray-600 mt-4 text-center">
              Range: {selectedRange.from.toLocaleDateString()} 
              {selectedRange.to && ` - ${selectedRange.to.toLocaleDateString()}`}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Calendar with Disabled Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar with Restrictions</CardTitle>
          <CardDescription>
            Calendar with disabled dates (weekends and past dates)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar02
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              return date < today || date.getDay() === 0 || date.getDay() === 6
            }}
            className="max-w-sm mx-auto"
          />
          <p className="text-sm text-gray-600 mt-4 text-center">
            Weekends and past dates are disabled
          </p>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            How to integrate these calendars in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. In Booking Forms:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<AdvancedCalendar
  placeholder="Select appointment date"
  selected={appointmentDate}
  onSelect={setAppointmentDate}
  showTimePicker={true}
  timeValue={appointmentTime}
  onTimeChange={setAppointmentTime}
/>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">2. In Availability Settings:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<DateRangeCalendar
  selected={availabilityRange}
  onSelect={setAvailabilityRange}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. In Dashboard Widgets:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<MultiMonthCalendar
  numberOfMonths={2}
  selected={selectedDate}
  onSelect={setSelectedDate}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
