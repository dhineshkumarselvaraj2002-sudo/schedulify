export interface Poll {
  id: string;
  title: string;
  description?: string;
  duration: number;
  slots: string[]; // ISO date strings
  votes: {
    participant: string;
    selectedSlots: string[];
  }[];
  status: "active" | "closed" | "expired" | "draft" | "finalized";
  createdAt: string;
  allowMultipleVotes?: boolean;
  deadline?: string;
  autoClose?: boolean;
}

// Mock data storage
let polls: Poll[] = [
  {
    id: "1",
    title: "Team Standup Meeting",
    description: "Weekly team standup to discuss progress and blockers",
    duration: 30,
    slots: [
      "2024-01-15T09:00:00.000Z",
      "2024-01-15T14:00:00.000Z",
      "2024-01-16T09:00:00.000Z",
      "2024-01-16T14:00:00.000Z"
    ],
    votes: [
      {
        participant: "John Doe",
        selectedSlots: ["2024-01-15T09:00:00.000Z", "2024-01-16T09:00:00.000Z"]
      },
      {
        participant: "Jane Smith",
        selectedSlots: ["2024-01-15T14:00:00.000Z"]
      },
      {
        participant: "Mike Johnson",
        selectedSlots: ["2024-01-15T09:00:00.000Z"]
      }
    ],
    status: "active",
    createdAt: "2024-01-10T10:00:00.000Z",
    allowMultipleVotes: true
  },
  {
    id: "2",
    title: "Project Planning Session",
    description: "Planning session for the new Q1 project",
    duration: 60,
    slots: [
      "2024-01-20T10:00:00.000Z",
      "2024-01-20T15:00:00.000Z",
      "2024-01-21T10:00:00.000Z"
    ],
    votes: [
      {
        participant: "Sarah Wilson",
        selectedSlots: ["2024-01-20T10:00:00.000Z"]
      },
      {
        participant: "David Brown",
        selectedSlots: ["2024-01-20T15:00:00.000Z"]
      }
    ],
    status: "closed",
    createdAt: "2024-01-08T14:30:00.000Z",
    allowMultipleVotes: false
  },
  {
    id: "3",
    title: "Client Meeting",
    description: "Meeting with client to discuss project requirements",
    duration: 90,
    slots: [
      "2024-01-25T11:00:00.000Z",
      "2024-01-25T14:00:00.000Z"
    ],
    votes: [],
    status: "draft",
    createdAt: "2024-01-12T09:15:00.000Z",
    allowMultipleVotes: false
  }
];

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all polls
export function getAllPolls(): Poll[] {
  return [...polls];
}

// Get poll by ID
export function getPollById(id: string): Poll | null {
  return polls.find(poll => poll.id === id) || null;
}

// Create new poll
export function createPoll(pollData: Omit<Poll, "id" | "createdAt" | "votes">): Poll {
  const newPoll: Poll = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    votes: [],
    ...pollData
  };
  
  polls.push(newPoll);
  return newPoll;
}

// Update poll
export function updatePoll(id: string, updates: Partial<Poll>): Poll | null {
  const pollIndex = polls.findIndex(poll => poll.id === id);
  if (pollIndex === -1) return null;
  
  polls[pollIndex] = { ...polls[pollIndex], ...updates };
  return polls[pollIndex];
}

// Delete poll
export function deletePoll(id: string): boolean {
  const pollIndex = polls.findIndex(poll => poll.id === id);
  if (pollIndex === -1) return false;
  
  polls.splice(pollIndex, 1);
  return true;
}

// Submit vote
export function submitVote(pollId: string, participant: string, selectedSlots: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const poll = getPollById(pollId);
      if (!poll) {
        reject(new Error("Poll not found"));
        return;
      }

      if (poll.status !== "active") {
        reject(new Error("Poll is not active"));
        return;
      }

      // Check if participant already voted
      const existingVoteIndex = poll.votes.findIndex(vote => vote.participant === participant);
      
      if (existingVoteIndex >= 0) {
        // Update existing vote
        poll.votes[existingVoteIndex] = { participant, selectedSlots };
      } else {
        // Add new vote
        poll.votes.push({ participant, selectedSlots });
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Update poll status
export function updatePollStatus(pollId: string, status: Poll["status"]): void {
  const poll = getPollById(pollId);
  if (poll) {
    poll.status = status;
  }
}

// Get polls by status
export function getPollsByStatus(status: Poll["status"]): Poll[] {
  return polls.filter(poll => poll.status === status);
}

// Search polls
export function searchPolls(query: string): Poll[] {
  const lowercaseQuery = query.toLowerCase();
  return polls.filter(poll => 
    poll.title.toLowerCase().includes(lowercaseQuery) ||
    poll.description?.toLowerCase().includes(lowercaseQuery)
  );
}
