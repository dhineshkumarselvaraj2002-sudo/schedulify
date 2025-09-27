"use client";

import { Calendar, Clock, Users, Settings, Plus, Check, AlertCircle, Zap, BarChart3, Link as LinkIcon, Video, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SchedulingPage() {
  // Mock data for demonstration
  const eventTypes = [
    {
      id: 1,
      title: "15 Minute Meeting",
      duration: "15 min",
      type: "One-on-One",
      bookings: 24,
      status: "active",
      color: "blue"
    },
    {
      id: 2,
      title: "30 Minute Call",
      duration: "30 min", 
      type: "One-on-One",
      bookings: 18,
      status: "active",
      color: "green"
    },
    {
      id: 3,
      title: "Team Meeting",
      duration: "60 min",
      type: "Group",
      bookings: 12,
      status: "active",
      color: "purple"
    }
  ];

  const scheduledEvents = [
    {
      id: 1,
      title: "Team Standup",
      attendee: "john.doe@company.com",
      time: "10:00 AM",
      date: "Today",
      duration: "30 min",
      type: "Video Call",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Client Presentation", 
      attendee: "sarah.smith@client.com",
      time: "2:00 PM",
      date: "Today",
      duration: "60 min",
      type: "Video Call",
      status: "confirmed"
    }
  ];

  const analytics = {
    totalBookings: 54,
    thisMonth: 24,
    averageDuration: "35 min",
    topEventType: "15 Minute Meeting"
  };

  return (
    <div className="w-full bg-white">
      {/* Calendly-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Scheduling</h1>
                <p className="text-sm text-gray-500">Manage your event types, bookings, and scheduling preferences</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <Link 
                href="/dashboard/meeting-types/new" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event Type
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{eventTypes.length}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Event Types</h3>
            <p className="text-sm text-gray-500">Active types</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Total Bookings</h3>
            <p className="text-sm text-gray-500">All time</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{analytics.thisMonth}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">This Month</h3>
            <p className="text-sm text-gray-500">New bookings</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{analytics.averageDuration}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Avg Duration</h3>
            <p className="text-sm text-gray-500">Per meeting</p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="event-types" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Event Types
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-900">New booking: 15 Minute Meeting</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-900">Event type created: Team Meeting</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-900">Calendar integration updated</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    href="/dashboard/meeting-types" 
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <LinkIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Event Types</h4>
                      <p className="text-sm text-gray-500">Create and edit your meeting types</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/dashboard/availability" 
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Set Availability</h4>
                      <p className="text-sm text-gray-500">Configure your working hours</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/dashboard/integrations" 
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Integrations</h4>
                      <p className="text-sm text-gray-500">Connect your calendar and apps</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Event Types Tab */}
          <TabsContent value="event-types" className="mt-6">
            <div className="space-y-4">
              {eventTypes.map((eventType) => (
                <div key={eventType.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        eventType.color === 'blue' ? 'bg-blue-50' :
                        eventType.color === 'green' ? 'bg-green-50' : 'bg-purple-50'
                      }`}>
                        <Calendar className={`w-6 h-6 ${
                          eventType.color === 'blue' ? 'text-blue-600' :
                          eventType.color === 'green' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{eventType.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{eventType.duration}</span>
                          <span>•</span>
                          <span>{eventType.type}</span>
                          <span>•</span>
                          <span>{eventType.bookings} bookings</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        eventType.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {eventType.status}
                      </span>
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <div className="space-y-4">
              {scheduledEvents.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        {event.type === 'Video Call' ? (
                          <Video className="w-6 h-6 text-green-600" />
                        ) : event.type === 'Phone Call' ? (
                          <Phone className="w-6 h-6 text-green-600" />
                        ) : (
                          <MapPin className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.attendee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{event.duration}</div>
                      <div className="text-sm text-gray-500">{event.type}</div>
                      <div className="flex space-x-2 mt-2">
                        <button className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-semibold text-gray-900">12 bookings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Week</span>
                    <span className="font-semibold text-gray-900">8 bookings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span className="font-semibold text-green-600">+50%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Event Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">15 Minute Meeting</span>
                    <span className="font-semibold text-gray-900">24 bookings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">30 Minute Call</span>
                    <span className="font-semibold text-gray-900">18 bookings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Team Meeting</span>
                    <span className="font-semibold text-gray-900">12 bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
