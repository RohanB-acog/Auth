// app/(protected)/dashboard/components/AdminDashboard.tsx
"use client";

import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Building, Activity, Settings, Search,
  BarChart2, Database, Layout, Shield
} from "lucide-react";

interface AdminDashboardProps {
  displayName: string;
  email: string;
}

export function AdminDashboard({ displayName, email }: AdminDashboardProps) {
  return (
    
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1a1d2d] fixed h-full">
        <div className="flex flex-col h-full">
          {/* Admin Panel Header */}
          <div className="px-6 py-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-white text-lg font-semibold">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 px-4 py-4">
            <div className="space-y-8">
              {/* Management Section */}
              <div>
                <p className="px-2 text-xs font-semibold tracking-wider text-gray-400/70 uppercase mb-4">
                  Management
                </p>
                <nav className="space-y-1">
                  <a href="#" className="flex items-center px-4 py-2.5 text-white bg-blue-600/20 border-l-4 border-blue-600 rounded-r-lg">
                    <Layout className="h-5 w-5 mr-3" />
                    Dashboard
                  </a>
                  <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-blue-600/10 hover:text-white rounded-lg transition-all duration-200">
                    <Users className="h-5 w-5 mr-3" />
                    Users
                  </a>
                  <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-blue-600/10 hover:text-white rounded-lg transition-all duration-200">
                    <Building className="h-5 w-5 mr-3" />
                    Departments
                  </a>
                </nav>
              </div>

              {/* Settings Section */}
              <div>
                <p className="px-2 text-xs font-semibold tracking-wider text-gray-400/70 uppercase mb-4">
                  Settings
                </p>
                <nav className="space-y-1">
                  <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-blue-600/10 hover:text-white rounded-lg transition-all duration-200">
                    <Shield className="h-5 w-5 mr-3" />
                    Security
                  </a>
                  <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-blue-600/10 hover:text-white rounded-lg transition-all duration-200">
                    <Settings className="h-5 w-5 mr-3" />
                    System
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-50">
        {/* Top Search Bar */}
        <div className="bg-white px-8 py-4 border-b sticky top-0 z-10">
          <div className="max-w-4xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search users or departments..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold text-blue-600 mt-1">156</h3>
                    <p className="text-sm text-gray-500 mt-1">+12 this week</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add more stat cards as needed */}
          </div>

          {/* Activity and Department Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>Latest user actions and events</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Add activity items */}
                </div>
              </CardContent>
            </Card>

            {/* Department Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Active departments and members</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Add department items */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system metrics and performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Add system status metrics */}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
    
  );
}