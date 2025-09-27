import { Calendar, Clock, Users, Video, Phone, MapPin, Plus, Filter, Search } from "lucide-react";
import Link from "next/link";

export default function MeetingsPage() {
  // Mock data for demonstration
  const meetings = [
    {
      id: 1,
      title: "Team Standup",
      time: "10:00 AM",
      date: "Today",
      duration: "30 min",
      type: "Video Call",
      attendees: 5,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      date: "Today",
      duration: "60 min",
      type: "Video Call",
      attendees: 3,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Project Review",
      time: "11:00 AM",
      date: "Yesterday",
      duration: "45 min",
      type: "In Person",
      attendees: 4,
      status: "completed"
    }
  ];

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
                <h1 className="text-2xl font-semibold text-gray-900">Meetings</h1>
                <p className="text-sm text-gray-500">Manage your upcoming and past meetings</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <Link 
                href="/dashboard/meetings/new" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filters - Calendly Style */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search meetings..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Upcoming
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Meetings List - Calendly Style */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    meeting.status === 'upcoming' ? 'bg-blue-50' : 'bg-gray-50'
                  }`}>
                    {meeting.type === 'Video Call' ? (
                      <Video className={`w-6 h-6 ${meeting.status === 'upcoming' ? 'text-blue-600' : 'text-gray-600'}`} />
                    ) : meeting.type === 'Phone Call' ? (
                      <Phone className={`w-6 h-6 ${meeting.status === 'upcoming' ? 'text-blue-600' : 'text-gray-600'}`} />
                    ) : (
                      <MapPin className={`w-6 h-6 ${meeting.status === 'upcoming' ? 'text-blue-600' : 'text-gray-600'}`} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{meeting.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{meeting.duration}</div>
                  <div className="text-sm text-gray-500">{meeting.type}</div>
                  <div className={`text-sm px-2 py-1 rounded-full mt-2 inline-block ${
                    meeting.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {meeting.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Calendly Style */}
        {meetings.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetings scheduled</h3>
            <p className="text-gray-500 mb-6">Your meetings will appear here once they're scheduled.</p>
            <Link 
              href="/dashboard/meetings/new" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Your First Meeting
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
