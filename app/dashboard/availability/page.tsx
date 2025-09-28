"use client";

import { Clock, Calendar, Users, Settings, Plus, Check, AlertCircle, Save, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import WeeklyAvailabilityForm from "@/components/availability/weekly-availability-form";
import DateAvailabilityForm from "@/components/availability/date-availability-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store/store";

export default function AvailabilityPage() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Exact Calendly Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Availability
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Set your working hours and availability preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Exact Layout from Image */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Availability Settings</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Set available times for {user?.name} - weekly schedule or specific dates
                </p>
              </div>
              <div className="p-6">
                <Tabs defaultValue="weekly" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="weekly" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Weekly Schedule
                    </TabsTrigger>
                    <TabsTrigger value="dates" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Specific Dates
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="weekly" className="mt-0">
                    <WeeklyAvailabilityForm />
                  </TabsContent>
                  
                  <TabsContent value="dates" className="mt-0">
                    <DateAvailabilityForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Current Schedule Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{user?.name}'s Schedule</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Monday - Friday</p>
                          <p className="text-xs text-gray-500">9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Weekend</p>
                          <p className="text-xs text-gray-500">Unavailable</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <Link 
                      href="/dashboard/availability/override" 
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Override Schedule</p>
                          <p className="text-xs text-gray-500">Temporarily change availability</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </Link>

                    <Link 
                      href="/dashboard/availability/buffer" 
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Buffer Time</p>
                          <p className="text-xs text-gray-500">Add breaks between meetings</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </Link>

                    <Link 
                      href="/dashboard/availability/timezone" 
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Timezone Settings</p>
                          <p className="text-xs text-gray-500">Manage timezone preferences</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </Link>
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