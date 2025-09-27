"use client";

import PageContainer from "@/components/booking/page-container";
import EventDetails from "@/components/booking/event-details";
import BookingCalendar from "@/components/booking/booking-calendar";
import BookingForm from "@/components/booking/booking-form";
import { getSinglePublicEventBySlugQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/dashboard/loader";
import { ErrorAlert } from "@/components/dashboard/ErrorAlert";
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react";
import { useBookingState } from "@/hooks/use-booking-state";

interface Props { 
	params: { 
		username: string;
		slug: string;
	} 
}

export default function BookingPage({ params }: Props) {
	const { username, slug } = params;
	
	// Get booking state to track progress
	const { selectedDate, selectedSlot, next } = useBookingState();
	
	// Fetch real event data based on username and slug
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["public_event", username, slug],
		queryFn: () => getSinglePublicEventBySlugQueryFn({ username, slug }),
	});

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md mx-auto px-4">
					<div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
						<Calendar className="w-10 h-10 text-blue-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-3">Loading Event</h2>
					<p className="text-gray-600 mb-8">Please wait while we prepare your booking experience...</p>
					<div className="flex justify-center">
						<Loader size="lg" color="black" />
					</div>
				</div>
			</div>
		);
	}

	if (isError || !data?.event) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md mx-auto px-4">
					<div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
						<Calendar className="w-10 h-10 text-red-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-3">Event Not Found</h2>
					<p className="text-gray-600 mb-8">
						The event you're looking for doesn't exist or is no longer available.
					</p>
					<button 
						onClick={() => window.history.back()}
						className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	const event = data.event;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header Section */}
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex items-center space-x-6">
						<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
							<Calendar className="w-8 h-8 text-blue-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Book a Meeting</h1>
							<p className="text-lg text-gray-600 mt-1">Schedule your appointment with {username}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Progress Indicator */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-center space-x-8">
					{/* Step 1: Select Date & Time */}
					<div className="flex items-center space-x-3">
						<div className={`w-8 h-8 rounded-full flex items-center justify-center ${
							selectedDate && selectedSlot ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
						}`}>
							{selectedDate && selectedSlot ? (
								<CheckCircle className="w-5 h-5" />
							) : (
								<span className="text-sm font-medium">1</span>
							)}
						</div>
						<span className={`text-sm font-medium ${
							selectedDate && selectedSlot ? 'text-blue-600' : 'text-gray-500'
						}`}>
							Select Date & Time
						</span>
					</div>

					{/* Arrow */}
					<div className={`w-8 h-0.5 ${
						selectedDate && selectedSlot ? 'bg-blue-600' : 'bg-gray-200'
					}`}></div>

					{/* Step 2: Enter Details */}
					<div className="flex items-center space-x-3">
						<div className={`w-8 h-8 rounded-full flex items-center justify-center ${
							next ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
						}`}>
							<span className="text-sm font-medium">2</span>
						</div>
						<span className={`text-sm font-medium ${
							next ? 'text-blue-600' : 'text-gray-500'
						}`}>
							Enter Details
						</span>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Event Details - Left Column */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8 shadow-sm hover:shadow-md transition-shadow">
							<EventDetails 
								username={username}
								eventTitle={event.title}
								description={event.description}
								duration={event.duration}
								eventLocationType={event.locationType}
							/>
						</div>
					</div>

					{/* Booking Section - Right Column */}
					<div className="lg:col-span-2">
						<div className="space-y-8">
							{/* Calendar Section - Hide when form is shown */}
							{!next && (
								<div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-8">
										<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
											<Clock className="w-5 h-5 text-blue-600" />
										</div>
										<div>
											<h2 className="text-xl font-bold text-gray-900">Select a Time</h2>
											<p className="text-gray-600 text-sm">Choose your preferred time slot</p>
										</div>
									</div>
									<BookingCalendar eventId={event.id} />
								</div>
							)}

							{/* Booking Form Section - Only show after date and time selection */}
							<BookingForm eventId={event.id} duration={event.duration} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
