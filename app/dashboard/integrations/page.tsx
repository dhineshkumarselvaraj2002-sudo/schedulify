"use client";

import PageTitle from "@/components/dashboard/PageTitle";
import IntegrationCard from "@/components/integrations/integration-card";
import { useQuery } from "@tanstack/react-query";
import { getAllIntegrationQueryFn } from "@/lib/api";
import { Loader } from "@/components/dashboard/loader";
import { ErrorAlert } from "@/components/dashboard/ErrorAlert";
import { Zap, Calendar, Plus, Settings, Check, Search } from "lucide-react";
import Link from "next/link";

export default function IntegrationsPage() {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["integration_list"],
    queryFn: getAllIntegrationQueryFn,
  });

  const integrations = data?.integrations || [];
  const connectedCount = integrations.filter(i => i.isConnected).length;
  const availableCount = integrations.filter(i => !i.isConnected).length;

  return (
    <div className="w-full bg-white">
      {/* Calendly-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Integrations & Apps</h1>
                <p className="text-sm text-gray-500">Connect your favorite tools and streamline your workflow</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <Link 
                href="/dashboard/integrations/browse" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Browse Apps
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{connectedCount}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Connected</h3>
            <p className="text-sm text-gray-500">Active integrations</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{availableCount}</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Available</h3>
            <p className="text-sm text-gray-500">Ready to connect</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Automations</h3>
            <p className="text-sm text-gray-500">Active workflows</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mt-2">Sync Status</h3>
            <p className="text-sm text-gray-500">Last sync: 2h ago</p>
          </div>
        </div>

        <ErrorAlert isError={isError} error={error} />

        {/* Search and Filters - Calendly Style */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search integrations..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Connected
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Available
              </button>
            </div>
          </div>
        </div>

        {/* Integrations List - Calendly Style */}
        <div className="space-y-4">
          {isFetching || isError ? (
            <div className="flex items-center justify-center min-h-[30vh] bg-white border border-gray-200 rounded-lg">
              <div className="text-center">
                <Loader size="lg" color="black" />
                <p className="mt-4 text-gray-500">Loading integrations...</p>
              </div>
            </div>
          ) : integrations.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
              <p className="text-gray-500 mb-6">Browse our available integrations to get started.</p>
              <Link 
                href="/dashboard/integrations/browse" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Browse Integrations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.app_type} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <IntegrationCard
                    isDisabled={
                      integration.app_type === "GOOGLE_MEET_AND_CALENDAR"
                        ? false
                        : true
                    }
                    appType={integration.app_type}
                    title={integration.title}
                    isConnected={integration.isConnected}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
