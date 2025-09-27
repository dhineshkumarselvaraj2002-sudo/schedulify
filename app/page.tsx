import Link from "next/link";
import { Calendar, Users, Settings, CreditCard, Clock, Zap, Shield, BarChart3 } from "lucide-react";

export default function Page() {
	return (
		<div className="min-h-screen bg-white">
			{/* Calendly-style Hero Section */}
			<section className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
							<Zap className="w-4 h-4" />
							Next.js Application
						</div>
						<h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900">
							Easy scheduling
							<span className="text-blue-600"> ahead</span>
						</h1>
						<p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
							Join millions of professionals who easily book meetings with the #1 scheduling tool.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/auth/signup" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors">
								Get Started
							</Link>
							<Link href="/dashboard" className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-50 transition-colors">
								View Dashboard
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Features Grid - Calendly Style */}
			<section className="py-20 lg:py-32 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Calendly makes scheduling simple</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Calendly's easy enough for individual users, and powerful enough to meet the needs of enterprise organizations.
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						<Link href="/auth/signin" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
									<Shield className="w-6 h-6 text-red-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Sign In</h3>
								<p className="text-gray-600 mb-4">Access your account securely with modern authentication</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Sign in now
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/auth/signup" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
									<Users className="w-6 h-6 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Sign Up</h3>
								<p className="text-gray-600 mb-4">Create a new account and start managing your schedule</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Get started
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/dashboard" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
									<BarChart3 className="w-6 h-6 text-green-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Dashboard</h3>
								<p className="text-gray-600 mb-4">Manage your account, view analytics, and control settings</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									View dashboard
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/pricing" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
									<CreditCard className="w-6 h-6 text-purple-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Pricing</h3>
								<p className="text-gray-600 mb-4">View our flexible pricing plans and choose what works for you</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									View pricing
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/book/username" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
									<Calendar className="w-6 h-6 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Book Meeting</h3>
								<p className="text-gray-600 mb-4">Schedule meetings with your team or clients easily</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Book now
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/dashboard/availability" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
									<Clock className="w-6 h-6 text-orange-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Availability</h3>
								<p className="text-gray-600 mb-4">Set your working hours and manage your schedule</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Set availability
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/dashboard/meeting-types" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
									<Settings className="w-6 h-6 text-indigo-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Meeting Types</h3>
								<p className="text-gray-600 mb-4">Configure and customize your event types</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Configure types
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
						
						<Link href="/dashboard/integrations" className="group">
							<div className="relative p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full">
								<div className="absolute top-6 right-6 w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
									<Zap className="w-6 h-6 text-yellow-600" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Integrations</h3>
								<p className="text-gray-600 mb-4">Connect your calendar and other productivity apps</p>
								<div className="flex items-center text-sm text-blue-600 font-medium">
									Connect apps
									<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* CTA Section - Calendly Style */}
			<section className="py-20 lg:py-32 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Power up your scheduling</h2>
						<p className="text-xl text-gray-600 mb-12">
							Get started in seconds — for free.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/auth/signup" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors">
								Start for free
							</Link>
							<Link href="/pricing" className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-50 transition-colors">
								Get a demo
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
