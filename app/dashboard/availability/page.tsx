import { Clock, Calendar, Users, Settings, Plus, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AvailabilityPage() {
  // Mock data for demonstration
  const availabilitySettings = [
    {
      id: 1,
      name: "Default Availability",
      type: "Weekly Schedule",
      status: "active",
      hours: "9:00 AM - 5:00 PM",
      days: "Monday - Friday",
      timezone: "Eastern Time"
    },
    {
      id: 2,
      name: "Weekend Availability",
      type: "Custom Schedule",
      status: "inactive",
      hours: "10:00 AM - 2:00 PM",
      days: "Saturday - Sunday",
      timezone: "Eastern Time"
    }
  ];

  const timeSlots = [
    { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { day: "Thursday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] }
  ];

  return (
    <div className="w-full bg-white">
      {/* Calendly-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Availability</h1>
                <p className="text-sm text-gray-500">Set your working hours and availability preferences</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button asChild>
                <Link href="/dashboard/availability/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Current Schedule - Calendly Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Availability Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Availability Settings</CardTitle>
                <Button variant="link" asChild>
                  <Link href="/dashboard/availability/settings">
                    Manage
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availabilitySettings.map((setting) => (
                  <Card key={setting.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{setting.name}</h3>
                        <Badge variant={setting.status === 'active' ? 'default' : 'secondary'}>
                          {setting.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{setting.hours}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{setting.days}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>{setting.timezone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Schedule</CardTitle>
                <Button variant="link" asChild>
                  <Link href="/dashboard/availability/edit">
                    Edit
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeSlots.map((day) => (
                  <Card key={day.day} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{day.day}</h3>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Calendly Style */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your availability settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link 
                    href="/dashboard/availability/override" 
                    className="flex items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-4">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Override Schedule</h3>
                      <p className="text-sm text-gray-500">Temporarily change availability</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link 
                    href="/dashboard/availability/buffer" 
                    className="flex items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Buffer Time</h3>
                      <p className="text-sm text-gray-500">Add breaks between meetings</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link 
                    href="/dashboard/availability/timezone" 
                    className="flex items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-4">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Timezone Settings</h3>
                      <p className="text-sm text-gray-500">Manage timezone preferences</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}