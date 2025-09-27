import PageContainer from "@/components/booking/page-container";
import EventDetails from "@/components/booking/event-details";
import BookingCalendar from "@/components/booking/booking-calendar";
import BookingForm from "@/components/booking/booking-form";

interface Props { 
	params: { username: string } 
}

export default function BookUsernamePage({ params }: Props) {
	// Mock data for now - in real app, fetch from API
	const mockEventData = {
		eventTitle: "Meeting with " + params.username,
		description: "A meeting with " + params.username,
		duration: 30,
		eventLocationType: "GOOGLE_MEET_AND_CALENDAR"
	};

	return (
		<PageContainer>
			<EventDetails 
				username={params.username}
				eventTitle={mockEventData.eventTitle}
				description={mockEventData.description}
				duration={mockEventData.duration}
				eventLocationType={mockEventData.eventLocationType}
			/>
			<BookingCalendar eventId="mock-event-id" />
			<BookingForm eventId="mock-event-id" duration={30} />
		</PageContainer>
	);
}
