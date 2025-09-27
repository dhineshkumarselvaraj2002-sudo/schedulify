import Link from "next/link";
import { Check, Star, Zap, Shield, Users } from "lucide-react";

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Calendly-style Header */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<div className="flex items-center space-x-4">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<Star className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-semibold text-gray-900">Pricing</h1>
								<p className="text-sm text-gray-500">Choose the perfect plan for your team</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<section className="py-20 lg:py-32">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Pick the perfect plan for your team</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Choose from our flexible pricing options designed to scale with your business needs.
						</p>
					</div>

					{/* Pricing Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{/* Free Plan */}
						<div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow">
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold mb-2 text-gray-900">Free</h3>
								<div className="text-4xl font-bold mb-2 text-gray-900">$0</div>
								<p className="text-gray-500">Perfect for getting started</p>
							</div>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Up to 5 meetings per month</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Basic scheduling</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Email support</span>
								</li>
							</ul>
							<Link href="/auth/signup" className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
								Get Started Free
							</Link>
						</div>

						{/* Pro Plan */}
						<div className="bg-white border-2 border-blue-600 rounded-lg p-8 hover:shadow-md transition-shadow relative">
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
								<div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
									Most Popular
								</div>
							</div>
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold mb-2 text-gray-900">Pro</h3>
								<div className="text-4xl font-bold mb-2 text-gray-900">$10</div>
								<p className="text-gray-500">per seat/month</p>
							</div>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Unlimited meetings</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Advanced scheduling</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Calendar integrations</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Priority support</span>
								</li>
							</ul>
							<Link href="/auth/signup" className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
								Start Pro Trial
							</Link>
						</div>

						{/* Enterprise Plan */}
						<div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow">
							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
								<div className="text-4xl font-bold mb-2 text-gray-900">$16</div>
								<p className="text-gray-500">per seat/month</p>
							</div>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Everything in Pro</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Team management</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">Advanced analytics</span>
								</li>
								<li className="flex items-center gap-3">
									<Check className="w-5 h-5 text-green-600 flex-shrink-0" />
									<span className="text-gray-600">24/7 support</span>
								</li>
							</ul>
							<Link href="/auth/signup" className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
								Contact Sales
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 lg:py-32 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Ready to get started?</h2>
						<p className="text-xl text-gray-600 mb-12">
							Join thousands of users who are already managing their schedules efficiently
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/auth/signup" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors">
								Start for free
							</Link>
							<Link href="/auth/signin" className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-50 transition-colors">
								Get a demo
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
