import { Calendar, Clock, Users, Video, Phone, MapPin, Plus, Filter, Search, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function ScheduledEventsPage() {
  // Mock data for demonstration
  const scheduledEvents = [
    {
      id: 1,
      title: "Team Standup Meeting",
      attendee: "john.doe@company.com",
      time: "10:00 AM",
      date: "Today",
      duration: "30 min",
      type: "Video Call",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-def-ghi",
      location: "Google Meet"
    },
    {
      id: 2,
      title: "Client Presentation",
      attendee: "sarah.smith@client.com",
      time: "2:00 PM",
      date: "Today",
      duration: "60 min",
      type: "Video Call",
      status: "confirmed",
      meetingLink: "https://zoom.us/j/123456789",
      location: "Zoom"
    },
    {
      id: 3,
      title: "Project Review",
      attendee: "mike.wilson@partner.com",
      time: "11:00 AM",
      date: "Tomorrow",
      duration: "45 min",
      type: "In Person",
      status: "pending",
      location: "Conference Room A"
    },
    {
      id: 4,
      title: "Weekly Sync",
      attendee: "team@company.com",
      time: "9:00 AM",
      date: "Dec 15, 2024",
      duration: "30 min",
      type: "Video Call",
      status: "cancelled",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
      location: "Microsoft Teams"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const confirmedCount = scheduledEvents.filter(e => e.status === 'confirmed').length;
  const pendingCount = scheduledEvents.filter(e => e.status === 'pending').length;
  const cancelledCount = scheduledEvents.filter(e => e.status === 'cancelled').length;

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
                <h1 className="text-2xl font-semibold text-gray-900">Scheduled Events</h1>
                <p className="text-sm text-gray-500">View and manage your upcoming and past scheduled events</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <Link 
                href="/dashboard/meeting-types" 
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{confirmedCount}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Confirmed</h3>
            <p className="text-sm text-gray-500">Ready to go</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{pendingCount}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Pending</h3>
            <p className="text-sm text-gray-500">Awaiting confirmation</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{cancelledCount}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Cancelled</h3>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{scheduledEvents.length}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Total Events</h3>
            <p className="text-sm text-gray-500">All time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{scheduledEvents.length}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Total Events</h3>
            <p className="text-sm text-gray-500">All time</p>
          </div>
        </div>

        {/* Search and Filters - Calendly Style */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events, attendees, or meeting types..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Confirmed
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Pending
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Events List - Calendly Style */}
        <div className="space-y-4">
          {scheduledEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    event.status === 'confirmed' ? 'bg-green-50' : 
                    event.status === 'pending' ? 'bg-yellow-50' : 'bg-gray-50'
                  }`}>
                    {event.type === 'Video Call' ? (
                      <Video className={`w-6 h-6 ${
                        event.status === 'confirmed' ? 'text-green-600' : 
                        event.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    ) : event.type === 'Phone Call' ? (
                      <Phone className={`w-6 h-6 ${
                        event.status === 'confirmed' ? 'text-green-600' : 
                        event.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    ) : (
                      <MapPin className={`w-6 h-6 ${
                        event.status === 'confirmed' ? 'text-green-600' : 
                        event.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {getStatusIcon(event.status)}
                        <span className="capitalize">{event.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendee}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {event.location}
                      {event.meetingLink && (
                        <a 
                          href={event.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-700 underline"
                        >
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{event.duration}</div>
                  <div className="text-sm text-gray-500">{event.type}</div>
                  <div className="flex space-x-2 mt-3">
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

        {/* Empty State - Calendly Style */}
        {scheduledEvents.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scheduled events</h3>
            <p className="text-gray-500 mb-6">Your scheduled events will appear here once they're booked.</p>
            <Link 
              href="/dashboard/meeting-types" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Event Type
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
