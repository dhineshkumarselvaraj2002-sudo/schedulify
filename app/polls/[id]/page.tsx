"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { getPollById, submitVote, Poll } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function PollVotingPage() {
  const params = useParams();
  const pollId = params.id as string;
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const pollData = getPollById(pollId);
    if (pollData) {
      setPoll(pollData);
    } else {
      setError("Poll not found");
    }
  }, [pollId]);

  const handleSlotToggle = (slotId: string) => {
    if (!poll) return;

    if (poll.allowMultipleVotes) {
      setSelectedSlots(prev => 
        prev.includes(slotId) 
          ? prev.filter(id => id !== slotId)
          : [...prev, slotId]
      );
    } else {
      setSelectedSlots([slotId]);
    }
  };

  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName.trim() || selectedSlots.length === 0) return;

    setIsSubmitting(true);
    
    try {
      await submitVote(pollId, participantName.trim(), selectedSlots);
      setHasVoted(true);
    } catch (error) {
      console.error("Failed to submit vote:", error);
      setError("Failed to submit vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  if (hasVoted) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Vote Submitted!</h2>
                <p className="text-muted-foreground mb-4">
                  Thank you for participating in this poll.
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <a href="/polls">Back to Polls</a>
                  </Button>
                  <Button asChild>
                    <a href={`/polls/${pollId}/results`}>View Results</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isPollClosed = poll.status === "closed" || poll.status === "expired";

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
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

        {isPollClosed ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Poll Closed</h2>
                <p className="text-muted-foreground mb-4">
                  This poll is no longer accepting votes.
                </p>
                <Button asChild>
                  <a href={`/polls/${pollId}/results`}>View Results</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Cast Your Vote</CardTitle>
              <p className="text-muted-foreground">
                {poll.allowMultipleVotes 
                  ? "Select one or more time slots that work for you"
                  : "Select the time slot that works best for you"
                }
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitVote} className="space-y-6">
                {/* Participant Name */}
                <div className="form-group">
                  <Label htmlFor="participantName" className="form-label">
                    Your Name *
                  </Label>
                  <Input
                    id="participantName"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="form-input"
                  />
                </div>

                {/* Time Slots */}
                <div className="form-group">
                  <Label className="form-label">Available Time Slots</Label>
                  <div className="space-y-3">
                    {poll.slots.map((slot: string, index: number) => {
                      const slotDate = new Date(slot);
                      const slotId = slot;
                      const isSelected = selectedSlots.includes(slotId);
                      const voteCount = poll.votes.filter((vote: any) => 
                        vote.selectedSlots.includes(slotId)
                      ).length;

                      return (
                        <div
                          key={slotId}
                          className={cn(
                            "poll-time-slot",
                            isSelected && "selected"
                          )}
                          onClick={() => handleSlotToggle(slotId)}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleSlotToggle(slotId)}
                              className="pointer-events-none"
                            />
                            <div>
                              <div className="font-medium">
                                {format(slotDate, "EEEE, MMMM d, yyyy")}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(slotDate, "h:mm a")}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {voteCount} vote{voteCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={!participantName.trim() || selectedSlots.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Vote"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
