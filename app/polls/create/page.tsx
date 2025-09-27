"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createPoll } from "@/lib/mock-data";

interface TimeSlot {
  id: string;
  date: Date;
  time: string;
}

export default function CreatePollPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", date: new Date(), time: "09:00" }
  ]);
  const [allowMultipleVotes, setAllowMultipleVotes] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [autoClose, setAutoClose] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      date: new Date(),
      time: "09:00"
    };
    setTimeSlots(prev => [...prev, newSlot]);
  };

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(prev => prev.filter(slot => slot.id !== id));
    }
  };

  const updateTimeSlot = (id: string, field: keyof TimeSlot, value: any) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    try {
      const pollData = {
        title: title.trim(),
        description: description.trim() || undefined,
        duration: parseInt(duration),
        slots: timeSlots.map(slot => {
          const dateTime = new Date(slot.date);
          const [hours, minutes] = slot.time.split(':').map(Number);
          dateTime.setHours(hours, minutes);
          return dateTime.toISOString();
        }),
        allowMultipleVotes,
        deadline: deadline?.toISOString(),
        autoClose,
        status: "active" as const
      };

      const newPoll = createPoll(pollData);
      router.push(`/polls/${newPoll.id}`);
    } catch (error) {
      console.error("Failed to create poll:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Create Meeting Poll</h1>
        <p className="page-subtitle">
          Set up a poll to find the best meeting time for your team
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Poll Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="form-group">
              <Label htmlFor="title" className="form-label">
                Poll Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Team Standup Meeting"
                required
                className="form-input"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <Label htmlFor="description" className="form-label">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description for your poll..."
                className="form-input"
                rows={3}
              />
            </div>

            {/* Meeting Duration */}
            <div className="form-group">
              <Label htmlFor="duration" className="form-label">
                Meeting Duration
              </Label>
              <Select value={duration} onValueChange={setDuration}>
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

            {/* Time Slots */}
            <div className="form-group">
              <Label className="form-label">Available Time Slots</Label>
              <div className="space-y-4">
                {timeSlots.map((slot, index) => (
                  <div key={slot.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
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
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={slot.date}
                              onSelect={(date) => date && updateTimeSlot(slot.id, "date", date)}
                              initialFocus
                            />
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
                    {timeSlots.length > 1 && (
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

            {/* Settings */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Poll Settings</h3>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowMultiple"
                  checked={allowMultipleVotes}
                  onCheckedChange={(checked) => setAllowMultipleVotes(checked === true)}
                />
                <Label htmlFor="allowMultiple" className="text-sm">
                  Allow participants to vote for multiple time slots
                </Label>
              </div>

              <div className="form-group">
                <Label className="form-label">Voting Deadline (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Set deadline"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoClose"
                  checked={autoClose}
                  onCheckedChange={(checked) => setAutoClose(checked === true)}
                />
                <Label htmlFor="autoClose" className="text-sm">
                  Automatically close poll after deadline
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary flex-1"
                disabled={!title.trim() || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Poll"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
