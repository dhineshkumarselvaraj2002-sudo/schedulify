"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Calendar, Users, MoreHorizontal, Edit, Trash2, Share2, Eye } from "lucide-react";
import { PollCard } from "@/components/meeting-polls/poll-card";
import { EmptyState } from "@/components/meeting-polls/empty-state";
import { getAllPolls, Poll } from "@/lib/mock-data";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Load polls from mock data
    const allPolls = getAllPolls();
    setPolls(allPolls);
    setFilteredPolls(allPolls);
  }, []);

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

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Meeting Polls</h1>
            <p className="page-subtitle">
              Create and manage polls to find the best meeting times
            </p>
          </div>
          <Button className="btn-primary" asChild>
            <a href="/polls/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </a>
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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

      {/* Polls Grid */}
      {filteredPolls.length === 0 ? (
        <EmptyState 
          hasPolls={polls.length > 0}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />
      ) : (
        <div className="poll-card-grid">
          {filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onDelete={handleDeletePoll}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
