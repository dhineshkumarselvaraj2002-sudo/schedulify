# Meeting Polls Feature

A comprehensive meeting poll system built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🗳️ Poll Management
- **Create Polls**: Set up polls with multiple time slots, duration settings, and voting preferences
- **Poll List**: View all polls with search and filter functionality
- **Status Management**: Track poll status (Active, Closed, Expired, Draft, Finalized)
- **Real-time Updates**: Live vote counting and participant tracking

### 📅 Time Slot Management
- **Multiple Time Slots**: Add unlimited time slots with date and time pickers
- **Flexible Duration**: Choose from 15 minutes to 2 hours
- **Smart Scheduling**: Automatic time slot validation and conflict detection

### 🗳️ Voting System
- **Single/Multiple Votes**: Allow participants to vote for one or multiple time slots
- **Participant Tracking**: Track who voted for which time slots
- **Vote Validation**: Prevent duplicate votes and ensure data integrity

### 📊 Results Dashboard
- **Visual Results**: Bar charts and progress indicators for vote distribution
- **Participant Lists**: See who voted for each time slot
- **Finalization**: Mark winning time slots and close polls
- **Export Options**: Share results and meeting confirmations

## Routes

- `/polls` - Poll list page with search and filters
- `/polls/create` - Create new poll form
- `/polls/[id]` - Poll voting page for participants
- `/polls/[id]/results` - Results dashboard for poll creators

## Components

### Core Components
- `PollCard` - Individual poll display with actions
- `EmptyState` - Empty state with call-to-action
- `PollVoting` - Voting interface for participants
- `PollResults` - Results dashboard with charts

### UI Components
- Responsive card layouts
- Interactive time slot selection
- Progress bars and vote counters
- Status badges and action buttons

## Data Structure

```typescript
interface Poll {
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
```

## Usage

### Creating a Poll
1. Navigate to `/polls/create`
2. Fill in poll title and description
3. Set meeting duration
4. Add time slots using date/time pickers
5. Configure voting settings
6. Set optional deadline
7. Submit to create poll

### Voting on a Poll
1. Visit poll URL (`/polls/[id]`)
2. Enter participant name
3. Select preferred time slots
4. Submit vote

### Viewing Results
1. Navigate to `/polls/[id]/results`
2. View vote distribution and participant lists
3. Finalize meeting time if ready
4. Close poll to stop accepting votes

## Mobile Responsiveness

- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for mobile devices
- Collapsible navigation
- Mobile-first design approach

## Styling

Built with Tailwind CSS and custom CSS classes:
- `poll-card-grid` - Responsive poll grid
- `poll-time-slot` - Time slot styling
- `poll-stats` - Statistics display
- Mobile-optimized breakpoints

## Future Enhancements

- Real-time notifications
- Email invitations
- Calendar integration
- Advanced analytics
- Poll templates
- Team collaboration features
