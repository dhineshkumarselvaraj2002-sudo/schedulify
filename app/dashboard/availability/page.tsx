import { Clock, Calendar, Users, Settings, Plus, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

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
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <Link 
                href="/dashboard/availability/new" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">40h</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Weekly Hours</h3>
            <p className="text-sm text-gray-500">Available time</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">5</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Working Days</h3>
            <p className="text-sm text-gray-500">Monday - Friday</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Schedules</h3>
            <p className="text-sm text-gray-500">Active schedules</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EST</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Timezone</h3>
            <p className="text-sm text-gray-500">Eastern Time</p>
          </div>
        </div>

        {/* Current Schedule - Calendly Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Availability Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Availability Settings</h2>
              <Link 
                href="/dashboard/availability/settings" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-4">
              {availabilitySettings.map((setting) => (
                <div key={setting.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{setting.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      setting.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {setting.status}
                    </span>
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
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
              <Link 
                href="/dashboard/availability/edit" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </Link>
            </div>
            <div className="space-y-3">
              {timeSlots.map((day) => (
                <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{day.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Calendly Style */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/dashboard/availability/override" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-4">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Override Schedule</h3>
                <p className="text-sm text-gray-500">Temporarily change availability</p>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/availability/buffer" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Buffer Time</h3>
                <p className="text-sm text-gray-500">Add breaks between meetings</p>
              </div>
            </Link>
            
            <Link 
              href="/dashboard/availability/timezone" 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-4">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Timezone Settings</h3>
                <p className="text-sm text-gray-500">Manage timezone preferences</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}