"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, Clock, Users, Settings, Plus, Check, AlertCircle, Zap, BarChart3, Link as LinkIcon, Edit, Trash2, MoreVertical, Download, Upload, Eye, EyeOff, BarChart, Search } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { geteventListQueryFn } from "@/lib/api";
import { Loader } from "@/components/dashboard/loader";
import EmptyState from "@/components/scheduling/empty-state";
import { ErrorAlert } from "@/components/dashboard/ErrorAlert";
import UserSection from "@/components/scheduling/user-section";
import EventListSection from "@/components/scheduling/event-list-section";
import { PollCard } from "@/components/meeting-polls/poll-card";
import { EmptyState as PollEmptyState } from "@/components/meeting-polls/empty-state";
import { getAllPolls, Poll, createPoll } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function SchedulingPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  
  // Polls state
  const [polls, setPolls] = useState<Poll[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Poll modals and views
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showPollVoting, setShowPollVoting] = useState(false);
  const [showPollResults, setShowPollResults] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  // Query for real meeting types data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event_list"],
    queryFn: geteventListQueryFn,
  });

  const events = data?.data.events || [];
  const username = data?.data.username ?? "";

  // Mock analytics data (can be replaced with real data later)
  const analytics = {
    totalBookings: 54,
    thisMonth: 24,
    averageDuration: "35 min",
    topEventType: "15 Minute Meeting"
  };

  // Load polls data
  useEffect(() => {
    const allPolls = getAllPolls();
    setPolls(allPolls);
    setFilteredPolls(allPolls);
  }, []);

  // Filter polls based on search and status
  useEffect(() => {
    let filtered = polls;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(poll =>
        poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(poll => poll.status === statusFilter);
    }

    setFilteredPolls(filtered);
  }, [polls, searchQuery, statusFilter]);

  const handleDeletePoll = (pollId: string) => {
    setPolls(prev => prev.filter(poll => poll.id !== pollId));
  };

  const handleStatusChange = (pollId: string, newStatus: Poll["status"]) => {
    setPolls(prev => prev.map(poll => 
      poll.id === pollId ? { ...poll, status: newStatus } : poll
    ));
  };

  // Poll creation form state
  const [pollForm, setPollForm] = useState({
    title: "",
    description: "",
    duration: "30",
    timeSlots: [{ id: "1", date: new Date(), time: "09:00" }],
    allowMultipleVotes: false,
    deadline: undefined as Date | undefined,
    autoClose: false
  });

  const [isSubmittingPoll, setIsSubmittingPoll] = useState(false);

  const addTimeSlot = () => {
    const newSlot = {
      id: Date.now().toString(),
      date: new Date(),
      time: "09:00"
    };
    setPollForm(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, newSlot]
    }));
  };

  const removeTimeSlot = (id: string) => {
    if (pollForm.timeSlots.length > 1) {
      setPollForm(prev => ({
        ...prev,
        timeSlots: prev.timeSlots.filter(slot => slot.id !== id)
      }));
    }
  };

  const updateTimeSlot = (id: string, field: string, value: any) => {
    setPollForm(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map(slot => 
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollForm.title.trim()) return;

    setIsSubmittingPoll(true);
    
    try {
      const pollData = {
        title: pollForm.title.trim(),
        description: pollForm.description.trim() || undefined,
        duration: parseInt(pollForm.duration),
        slots: pollForm.timeSlots.map(slot => {
          const dateTime = new Date(slot.date);
          const [hours, minutes] = slot.time.split(':').map(Number);
          dateTime.setHours(hours, minutes);
          return dateTime.toISOString();
        }),
        allowMultipleVotes: pollForm.allowMultipleVotes,
        deadline: pollForm.deadline?.toISOString(),
        autoClose: pollForm.autoClose,
        status: "active" as const
      };

      const newPoll = createPoll(pollData);
      setPolls(prev => [...prev, newPoll]);
      setShowCreatePoll(false);
      
      // Reset form
      setPollForm({
        title: "",
        description: "",
        duration: "30",
        timeSlots: [{ id: "1", date: new Date(), time: "09:00" }],
        allowMultipleVotes: false,
        deadline: undefined,
        autoClose: false
      });
    } catch (error) {
      console.error("Failed to create poll:", error);
    } finally {
      setIsSubmittingPoll(false);
    }
  };

  const handleViewPoll = (poll: Poll) => {
    setSelectedPoll(poll);
    setShowPollVoting(true);
  };

  const handleViewResults = (poll: Poll) => {
    setSelectedPoll(poll);
    setShowPollResults(true);
  };




  const handleEdit = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const handleDelete = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowDeleteDialog(true);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };


  return (
    <div className="scheduling-container">
      {/* Calendly-style Header */}
      <div className="scheduling-header">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="scheduling-header-content">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                {/* <Calendar className="w-6 h-6 text-white" /> */}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Scheduling</h1>
                <p className="text-sm text-gray-500">Manage your event types, bookings, and scheduling preferences</p>
              </div>
            </div>
            <div className="scheduling-header-actions">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button 
                onClick={() => setActiveTab("event-types")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event Type
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="scheduling-content">

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="scheduling-tabs">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="event-types" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Event Types
            </TabsTrigger>
            <TabsTrigger value="polls" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Meeting Polls
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="scheduling-tab-content">
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
                  <button 
                    onClick={() => setActiveTab("event-types")}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <LinkIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Event Types</h4>
                      <p className="text-sm text-gray-500">Create and edit your meeting types</p>
                    </div>
                  </button>
                  
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
                  
                  <button 
                    onClick={() => setActiveTab("polls")}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Meeting Polls</h4>
                      <p className="text-sm text-gray-500">Create polls to find the best meeting times</p>
                    </div>
                  </button>
                  
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
          <TabsContent value="event-types" className="scheduling-tab-content">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Meeting Types</h2>
                  <p className="mt-2 text-gray-600">Create and manage your meeting types</p>
                </div>
                <div className="flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </button>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Meeting Type
                  </button>
                </div>
              </div>
            </div>

            <ErrorAlert isError={isError} error={error} />

            {isPending ? (
              <div className="flex items-center justify-center min-h-[50vh] bg-white border border-gray-200 rounded-lg">
                <div className="text-center">
                  <Loader size="lg" color="black" />
                  <p className="mt-4 text-gray-500">Loading event types...</p>
                </div>
              </div>
            ) : events?.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <EmptyState />
              </div>
            ) : (
              <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <UserSection username={username} />
                <EventListSection events={events} username={username} />
              </div>
            )}
          </TabsContent>

          {/* Meeting Polls Tab */}
          <TabsContent value="polls" className="scheduling-tab-content">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Meeting Polls</h2>
                  <p className="mt-2 text-gray-600">Create and manage polls to find the best meeting times</p>
                </div>
                <Button 
                  onClick={() => setShowCreatePoll(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Poll
                </Button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search polls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Polls</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Poll Form */}
            {showCreatePoll && (
              <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6 poll-form-container">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Create New Poll</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreatePoll(false)}
                  >
                    Cancel
                  </Button>
                </div>
                
                <form onSubmit={handleCreatePoll} className="space-y-6">
                  <div className="poll-form-grid">
                    <div>
                      <Label htmlFor="poll-title" className="form-label">Poll Title *</Label>
                      <Input
                        id="poll-title"
                        value={pollForm.title}
                        onChange={(e) => setPollForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Team Standup Meeting"
                        required
                        className="form-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="poll-duration" className="form-label">Meeting Duration</Label>
                      <Select value={pollForm.duration} onValueChange={(value) => setPollForm(prev => ({ ...prev, duration: value }))}>
                        <SelectTrigger className="form-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="poll-description" className="form-label">Description</Label>
                    <Textarea
                      id="poll-description"
                      value={pollForm.description}
                      onChange={(e) => setPollForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Optional description for your poll..."
                      className="form-input"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label className="form-label">Available Time Slots</Label>
                    <div className="space-y-4">
                      {pollForm.timeSlots.map((slot, index) => (
                        <div key={slot.id} className="poll-time-slot-form">
                          <div className="poll-time-slot-inputs">
                            <div className="calendar-container">
                              <Label className="text-sm text-muted-foreground">Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !slot.date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {slot.date ? format(slot.date, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent 
                                  className="calendar-popover-content"
                                  side="bottom"
                                  align="start"
                                  sideOffset={4}
                                  avoidCollisions={true}
                                  collisionPadding={10}
                                >
                                  {/* <Calendar
                                    mode="single"
                                    selected={slot.date}
                                    onSelect={(date) => date && updateTimeSlot(slot.id, "date", date)}
                                    initialFocus
                                  /> */}
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">Time</Label>
                              <Input
                                type="time"
                                value={slot.time}
                                onChange={(e) => updateTimeSlot(slot.id, "time", e.target.value)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          {pollForm.timeSlots.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTimeSlot(slot.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTimeSlot}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Time Slot
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Poll Settings</h3>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowMultiple"
                        checked={pollForm.allowMultipleVotes}
                        onCheckedChange={(checked) => setPollForm(prev => ({ ...prev, allowMultipleVotes: checked === true }))}
                      />
                      <Label htmlFor="allowMultiple" className="text-sm">
                        Allow participants to vote for multiple time slots
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoClose"
                        checked={pollForm.autoClose}
                        onCheckedChange={(checked) => setPollForm(prev => ({ ...prev, autoClose: checked === true }))}
                      />
                      <Label htmlFor="autoClose" className="text-sm">
                        Automatically close poll after deadline
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreatePoll(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-primary flex-1"
                      disabled={!pollForm.title.trim() || isSubmittingPoll}
                    >
                      {isSubmittingPoll ? "Creating..." : "Create Poll"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Polls Grid */}
            {!showCreatePoll && (
              <>
                {filteredPolls.length === 0 ? (
                  <PollEmptyState 
                    hasPolls={polls.length > 0}
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                  />
                ) : (
                  <div className="poll-card-grid">
                    {filteredPolls.map((poll) => (
                      <div key={poll.id} className="poll-card">
                        <div className="flex items-start justify-between mb-4 min-w-0">
                          <div className="flex-1 min-w-0 mr-4">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{poll.title}</h3>
                            {poll.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{poll.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              poll.status === "active" ? "bg-green-100 text-green-800" :
                              poll.status === "closed" ? "bg-gray-100 text-gray-800" :
                              poll.status === "expired" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="poll-stats-row mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{poll.votes.length} votes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{poll.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* <Calendar className="w-4 h-4" /> */}
                            <span>{poll.slots.length} slots</span>
                          </div>
                        </div>

                        <div className="poll-actions">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewPoll(poll)}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleViewResults(poll)}
                            className="flex-1"
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Results
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="scheduling-tab-content">
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


      {/* Edit Meeting Type Modal */}
      {showModal && (
        <div className="scheduling-modal">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="scheduling-modal-backdrop" onClick={() => setShowModal(false)} />
            <div className="scheduling-modal-content">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {selectedMeeting ? 'Edit Meeting Type' : 'Create New Meeting Type'}
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Meeting Name</label>
                        <input
                          type="text"
                          defaultValue={(selectedMeeting as any)?.name || ''}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>45 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
                        <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>One-on-One</option>
                          <option>Group</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {selectedMeeting ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="scheduling-modal">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="scheduling-modal-backdrop" onClick={() => setShowDeleteDialog(false)} />
            <div className="scheduling-modal-content">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Meeting Type
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete "{(selectedMeeting as any)?.name}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poll Voting Modal */}
      {showPollVoting && selectedPoll && (
        <div className="scheduling-modal">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="scheduling-modal-backdrop" onClick={() => setShowPollVoting(false)} />
            <div className="scheduling-modal-content sm:max-w-2xl modal-content">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[80vh] overflow-y-auto">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full min-w-0">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {selectedPoll.title}
                    </h3>
                    {selectedPoll.description && (
                      <p className="text-sm text-gray-600 mb-4">{selectedPoll.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedPoll.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedPoll.votes.length} votes</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Available Time Slots</h4>
                      {selectedPoll.slots.map((slot, index) => {
                        const slotDate = new Date(slot);
                        return (
                          <div key={slot} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">
                                {format(slotDate, "EEEE, MMMM d, yyyy")}
                              </div>
                              <div className="text-sm text-gray-500">
                                {format(slotDate, "h:mm a")}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {selectedPoll.votes.filter(vote => vote.selectedSlots.includes(slot)).length} votes
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowPollVoting(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poll Results Modal */}
      {showPollResults && selectedPoll && (
        <div className="scheduling-modal">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="scheduling-modal-backdrop" onClick={() => setShowPollResults(false)} />
            <div className="scheduling-modal-content sm:max-w-4xl modal-content">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[80vh] overflow-y-auto">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full min-w-0">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {selectedPoll.title} - Results
                    </h3>
                    
                    <div className="space-y-4">
                      {selectedPoll.slots.map((slot, index) => {
                        const slotDate = new Date(slot);
                        const voteCount = selectedPoll.votes.filter(vote => vote.selectedSlots.includes(slot)).length;
                        const participants = selectedPoll.votes
                          .filter(vote => vote.selectedSlots.includes(slot))
                          .map(vote => vote.participant);
                        const percentage = selectedPoll.votes.length > 0 ? (voteCount / selectedPoll.votes.length) * 100 : 0;
                        
                        return (
                          <div key={slot} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {format(slotDate, "EEEE, MMMM d, yyyy")}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {format(slotDate, "h:mm a")}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{voteCount} votes</div>
                                <div className="text-sm text-gray-500">
                                  {percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            
                            {participants.length > 0 && (
                              <div className="text-sm text-gray-500">
                                <span className="font-medium">Voted by:</span> {participants.join(", ")}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowPollResults(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
