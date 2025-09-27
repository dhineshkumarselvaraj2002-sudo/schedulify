"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar, Users, Clock, MoreHorizontal, Edit, Trash2, Share2, Eye } from "lucide-react";
import { format } from "date-fns";
import { Poll } from "@/lib/mock-data";

interface PollCardProps {
  poll: Poll;
  onDelete: (pollId: string) => void;
  onStatusChange: (pollId: string, status: Poll["status"]) => void;
}

export function PollCard({ poll, onDelete, onStatusChange }: PollCardProps) {
  const getStatusColor = (status: Poll["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "finalized":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleShare = async () => {
    const pollUrl = `${window.location.origin}/polls/${poll.id}`;
    try {
      await navigator.clipboard.writeText(pollUrl);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <Card className="poll-card">
      <CardHeader className="pb-3">
        <div className="poll-card-header">
          <div className="poll-card-title">
            <CardTitle className="text-lg font-semibold truncate">
              {poll.title}
            </CardTitle>
            {poll.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {poll.description}
              </p>
            )}
          </div>
          <div className="poll-card-actions">
            <Badge className={getStatusColor(poll.status)}>
              {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={4}
                className="poll-card-dropdown"
                avoidCollisions={true}
                collisionPadding={10}
              >
                <DropdownMenuItem asChild>
                  <a href={`/polls/${poll.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`/polls/${poll.id}/results`}>
                    {/* <Calendar className="w-4 h-4 mr-2" /> */}
                    Results
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </DropdownMenuItem>
                {poll.status === "draft" && (
                  <DropdownMenuItem asChild>
                    <a href={`/polls/${poll.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </a>
                  </DropdownMenuItem>
                )}
                {poll.status === "active" && (
                  <DropdownMenuItem onClick={() => onStatusChange(poll.id, "closed")}>
                    Close Poll
                  </DropdownMenuItem>
                )}
                {poll.status === "closed" && (
                  <DropdownMenuItem onClick={() => onStatusChange(poll.id, "active")}>
                    Reopen Poll
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onDelete(poll.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="poll-card-content">
        <div className="space-y-3">
          {/* Poll Stats */}
          <div className="poll-stats flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{poll.votes.length} votes</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{poll.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{poll.slots.length} slots</span>
            </div>
          </div>

          {/* Created Date */}
          <div className="text-xs text-muted-foreground">
            Created {format(new Date(poll.createdAt), "MMM d, yyyy")}
          </div>

          {/* Action Buttons */}
          <div className="poll-card-buttons">
            <Button asChild variant="outline" size="sm" className="flex-1 min-w-0">
              <a href={`/polls/${poll.id}`}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </a>
            </Button>
            <Button asChild size="sm" className="flex-1 min-w-0">
              <a href={`/polls/${poll.id}/results`}>
                <Calendar className="w-4 h-4 mr-1" />
                Results
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
