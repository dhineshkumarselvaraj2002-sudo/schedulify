"use client";

import PageContainer from "@/components/booking/page-container";
import EventDetails from "@/components/booking/event-details";
import BookingCalendar from "@/components/booking/booking-calendar";
import BookingForm from "@/components/booking/booking-form";
import { getSinglePublicEventBySlugQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/dashboard/loader";
import { ErrorAlert } from "@/components/dashboard/ErrorAlert";

interface Props { 
	params: { 
		username: string;
		slug: string;
	} 
}

export default function BookingPage({ params }: Props) {
	const { username, slug } = params;
	
	// Fetch real event data based on username and slug
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["public_event", username, slug],
		queryFn: () => getSinglePublicEventBySlugQueryFn({ username, slug }),
	});

	if (isLoading) {
		return (
			<PageContainer>
				<div className="flex items-center justify-center min-h-[400px]">
					<Loader size="lg" color="black" />
				</div>
			</PageContainer>
		);
	}

	if (isError || !data?.event) {
		return (
			<PageContainer>
				<ErrorAlert isError={isError} error={error} />
			</PageContainer>
		);
	}

	const event = data.event;

	return (
		<PageContainer>
			<EventDetails 
				username={username}
				eventTitle={event.title}
				description={event.description}
				duration={event.duration}
				eventLocationType={event.locationType}
			/>
			<BookingCalendar eventId={event.id} />
			<BookingForm eventId={event.id} duration={event.duration} />
		</PageContainer>
	);
}
