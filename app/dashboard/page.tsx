import Link from "next/link";
import { Clock, Settings, Zap, Calendar, Users, BarChart3, Bell, Shield } from "lucide-react";

export default function DashboardPage() {
	return (
		<div className="w-full bg-white">
			{/* Calendly-style Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<div className="flex items-center space-x-4">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<BarChart3 className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
								<p className="text-sm text-gray-500">Welcome back! Manage your account and settings</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Stats - Calendly Style */}
			<div className="w-full px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
								<Calendar className="w-5 h-5 text-blue-600" />
							</div>
							<span className="text-2xl font-bold text-gray-900">12</span>
						</div>
						<h3 className="font-medium text-gray-900 mt-2">Meetings Today</h3>
						<p className="text-sm text-gray-500">3 upcoming</p>
					</div>
					
					<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
								<Users className="w-5 h-5 text-green-600" />
							</div>
							<span className="text-2xl font-bold text-gray-900">48</span>
						</div>
						<h3 className="font-medium text-gray-900 mt-2">Total Bookings</h3>
						<p className="text-sm text-gray-500">This month</p>
					</div>
					
					<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
								<Clock className="w-5 h-5 text-purple-600" />
							</div>
							<span className="text-2xl font-bold text-gray-900">2.5h</span>
						</div>
						<h3 className="font-medium text-gray-900 mt-2">Time Saved</h3>
						<p className="text-sm text-gray-500">This week</p>
					</div>
					
					<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
								<Bell className="w-5 h-5 text-orange-600" />
							</div>
							<span className="text-2xl font-bold text-gray-900">3</span>
						</div>
						<h3 className="font-medium text-gray-900 mt-2">Notifications</h3>
						<p className="text-sm text-gray-500">Unread</p>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Primary Actions */}
					<div className="lg:col-span-2">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Link href="/dashboard/scheduling" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
											<Calendar className="w-6 h-6 text-indigo-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Scheduling</h3>
											<p className="text-sm text-gray-500">Manage your scheduling and event types</p>
										</div>
									</div>
								</div>
							</Link>
							<Link href="/dashboard/availability" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
											<Clock className="w-6 h-6 text-blue-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Availability</h3>
											<p className="text-sm text-gray-500">Manage your availability and working hours</p>
										</div>
									</div>
								</div>
							</Link>
							
							<Link href="/dashboard/meeting-types" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
											<Settings className="w-6 h-6 text-green-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Meeting Types</h3>
											<p className="text-sm text-gray-500">Configure and customize your event types</p>
										</div>
									</div>
								</div>
							</Link>
							
							<Link href="/dashboard/integrations" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
											<Zap className="w-6 h-6 text-purple-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Integrations</h3>
											<p className="text-sm text-gray-500">Connect your calendar and other apps</p>
										</div>
									</div>
								</div>
							</Link>
							
							<Link href="/dashboard/scheduled-events" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
											<Calendar className="w-6 h-6 text-orange-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Scheduled Events</h3>
											<p className="text-sm text-gray-500">View and manage your scheduled events</p>
										</div>
									</div>
								</div>
							</Link>
							
							<Link href="/dashboard/meetings" className="group">
								<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
											<Users className="w-6 h-6 text-purple-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Meetings</h3>
											<p className="text-sm text-gray-500">View and manage your meetings</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<div>
										<p className="text-sm text-gray-900">Meeting scheduled</p>
										<p className="text-xs text-gray-500">2 hours ago</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<div>
										<p className="text-sm text-gray-900">Calendar connected</p>
										<p className="text-xs text-gray-500">1 day ago</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
									<div>
										<p className="text-sm text-gray-900">New integration added</p>
										<p className="text-xs text-gray-500">3 days ago</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
