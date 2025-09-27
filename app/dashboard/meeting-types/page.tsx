"use client";

import { useState } from "react";
import UserSection from "@/components/scheduling/user-section";
import EventListSection from "@/components/scheduling/event-list-section";
import PageTitle from "@/components/dashboard/PageTitle";
import { geteventListQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/dashboard/loader";
import EmptyState from "@/components/scheduling/empty-state";
import { ErrorAlert } from "@/components/dashboard/ErrorAlert";
import { Calendar, Plus, Clock, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function MeetingTypesPage() {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["event_list"],
    queryFn: geteventListQueryFn,
  });

  const events = data?.data.events || [];
  const username = data?.data.username ?? "";


	return (
		<div className="w-full bg-white">
			{/* Calendly-style Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<div className="flex items-center space-x-4">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<Calendar className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-semibold text-gray-900">Event types</h1>
								<p className="text-sm text-gray-500">Manage your meeting types and schedules</p>
							</div>
						</div>
						{/* <Link 
							href="/dashboard/meeting-types/new" 
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
						>
							<Plus className="w-4 h-4 mr-2" />
							Create Event Type
						</Link> */}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="w-full px-4 sm:px-6 lg:px-8 py-8">
				<ErrorAlert isError={isError} error={error} />

				{isPending ? (
					<div className="flex items-center justify-center min-h-[50vh] bg-white border border-gray-200 rounded-lg">
						<div className="text-center">
							<Loader size="lg" color="black" />
							<p className="mt-4 text-gray-500">Loading event types...</p>
						</div>
					</div>
				) : events?.length === 0 ? (
					<div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
						<EmptyState />
					</div>
				) : (
					<div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
						<UserSection username={username} />
						<EventListSection events={events} username={username} />
					</div>
				)}
			</div>
		</div>
	);
}
