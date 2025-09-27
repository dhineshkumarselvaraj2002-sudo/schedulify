"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { getPollById, updatePollStatus, Poll } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function PollResultsPage() {
  const params = useParams();
  const pollId = params.id as string;
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const pollData = getPollById(pollId);
    if (pollData) {
      setPoll(pollData);
    } else {
      setError("Poll not found");
    }
  }, [pollId]);

  const handleStatusChange = async (newStatus: Poll["status"]) => {
    if (!poll) return;
    
    setIsUpdating(true);
    try {
      updatePollStatus(pollId, newStatus);
      setPoll((prev: Poll | null) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error("Failed to update poll status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getVoteCounts = () => {
    if (!poll) return [];
    
    return poll.slots.map((slot: string) => {
      const voteCount = poll.votes.filter((vote: any) => 
        vote.selectedSlots.includes(slot)
      ).length;
      
      const participants = poll.votes
        .filter((vote: any) => vote.selectedSlots.includes(slot))
        .map((vote: any) => vote.participant);
      
      return {
        slot,
        voteCount,
        participants,
        percentage: poll.votes.length > 0 ? (voteCount / poll.votes.length) * 100 : 0
      };
    }).sort((a: any, b: any) => b.voteCount - a.voteCount);
  };

  const getTopSlot = () => {
    const voteCounts = getVoteCounts();
    return voteCounts.length > 0 ? voteCounts[0] : null;
  };

  if (error) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Poll Not Found</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button asChild>
                  <a href="/polls">Back to Polls</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="loading-spinner w-8 h-8" />
        </div>
      </div>
    );
  }

  const voteCounts = getVoteCounts();
  const topSlot = getTopSlot();
  const isFinalized = poll.status === "finalized";

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        {/* Poll Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{poll.title}</CardTitle>
                {poll.description && (
                  <p className="text-muted-foreground mt-2">{poll.description}</p>
                )}
              </div>
              <Badge 
                variant={poll.status === "active" ? "default" : "secondary"}
                className="ml-4"
              >
                {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{poll.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{poll.votes.length} votes</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Created {format(new Date(poll.createdAt), "MMM d, yyyy")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finalized Meeting Banner */}
        {isFinalized && topSlot && (
          <Card className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    Meeting Scheduled
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    {format(new Date(topSlot.slot), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Voting Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {voteCounts.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Votes Yet</h3>
                <p className="text-muted-foreground">
                  Share the poll link to start collecting votes.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {voteCounts.map((result: any, index: number) => {
                  const slotDate = new Date(result.slot);
                  const isTopChoice = index === 0;
                  
                  return (
                    <div key={result.slot} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                            isTopChoice 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          )}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">
                              {format(slotDate, "EEEE, MMMM d, yyyy")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(slotDate, "h:mm a")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{result.voteCount} votes</div>
                          <div className="text-sm text-muted-foreground">
                            {result.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      
                      <Progress value={result.percentage} className="h-2" />
                      
                      {result.participants.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Voted by:</span>{" "}
                          {result.participants.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!isFinalized && (
          <Card>
            <CardHeader>
              <CardTitle>Poll Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                {poll.status === "active" && topSlot && (
                  <Button
                    onClick={() => handleStatusChange("finalized")}
                    disabled={isUpdating}
                    className="btn-primary flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalize Meeting
                  </Button>
                )}
                
                {poll.status === "active" && (
                  <Button
                    onClick={() => handleStatusChange("closed")}
                    disabled={isUpdating}
                    variant="outline"
                    className="flex-1"
                  >
                    Close Poll
                  </Button>
                )}
                
                {poll.status === "closed" && (
                  <Button
                    onClick={() => handleStatusChange("active")}
                    disabled={isUpdating}
                    variant="outline"
                    className="flex-1"
                  >
                    Reopen Poll
                  </Button>
                )}
                
                <Button asChild variant="outline">
                  <a href={`/polls/${pollId}`}>View Poll</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
