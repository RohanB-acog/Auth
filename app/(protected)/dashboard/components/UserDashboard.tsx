// app/(protected)/dashboard/components/UserDashboard.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarDays, Users, Clock, Activity, Code, Database, 
  Layout, Settings, Bell, ArrowUp, Search, BarChart2,
  ArrowDown, MoreVertical
} from "lucide-react";
interface UserDashboardProps {
  displayName: string;
  email: string;
}

export function UserDashboard({ displayName, email }: UserDashboardProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#1a1d2d] text-gray-300">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Layout className="h-5 w-5 text-white" />
            </div>
            <span className="text-white text-lg font-semibold">Dashboard</span>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">DASHBOARD</p>
              <div className="space-y-1">
                <a href="#" className="flex items-center px-4 py-2.5 text-white bg-purple-600/20 border-l-4 border-purple-600 rounded-r-lg">
                  <Layout className="h-5 w-5 mr-3" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-purple-600/10 hover:text-white rounded-lg transition-all duration-200">
                  <Code className="h-5 w-5 mr-3" />
                  Statistics
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-purple-600/10 hover:text-white rounded-lg transition-all duration-200">
                  <Database className="h-5 w-5 mr-3" />
                  Protocols
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">COMPONENTS</p>
              <div className="space-y-1">
                <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-purple-600/10 hover:text-white rounded-lg transition-all duration-200">
                  <Settings className="h-5 w-5 mr-3" />
                  Elements
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 text-gray-400 hover:bg-purple-600/10 hover:text-white rounded-lg transition-all duration-200">
                  <BarChart2 className="h-5 w-5 mr-3" />
                  Advanced UI
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar
        <div className="bg-white px-8 py-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for results..." 
                className="w-96 px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Clock className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
              {displayName.charAt(0)}
            </div>
          </div>
        </div> */}

        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-8">Welcome back, {displayName}! 👋</h1>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-purple-600">$5,900.00</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>55% Higher</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">New Employees</p>
                    <h3 className="text-2xl font-bold text-purple-600">15</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>5% Increased</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-purple-600">$8,500</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-red-500">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>12% Decrease</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Progress and Monthly Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Progress</CardTitle>
                    <CardDescription>Current project completion rates</CardDescription>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Frontend Development</span>
                      <span className="text-purple-600">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-600 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Backend Integration</span>
                      <span className="text-purple-600">65%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-600 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">UI/UX Design</span>
                      <span className="text-purple-600">92%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-600 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Monthly Revenue</CardTitle>
                    <CardDescription>Revenue trends over time</CardDescription>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end space-x-2">
                  {[65, 45, 75, 55, 85, 70, 60].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-purple-600 rounded-t-lg transition-all duration-300 hover:bg-purple-700"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>Latest development activities</CardDescription>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Add New Task
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-500">Task</th>
                      <th className="text-left p-4 font-medium text-gray-500">Team</th>
                      <th className="text-left p-4 font-medium text-gray-500">Priority</th>
                      <th className="text-left p-4 font-medium text-gray-500">Status</th>
                      <th className="text-left p-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4">API Integration</td>
                      <td className="p-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">JD</div>
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">AM</div>
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">RK</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">High</span>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">Completed</span>
                      </td>
                      <td className="p-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-white border-l">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">Project Timeline</h3>
          
          <div className="space-y-6">
            <div className="relative pl-6 pb-6 border-l-2 border-purple-200">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
              <h4 className="font-medium mb-1">Mobile App Design</h4>
              <p className="text-sm text-gray-500">25 August 2023</p>
              <div className="mt-2 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">JD</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">AM</div>
              </div>
            </div>

            <div className="relative pl-6 pb-6 border-l-2 border-purple-200">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
              <h4 className="font-medium mb-1">Website Redesign</h4>
              <p className="text-sm text-gray-500">12 June 2023</p>
              <div className="mt-2 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm">RK</div>
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm">SP</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Project Launch</h3>
            <div className="space-y-2">
              <div className="h-2 bg-purple-600 rounded-full"></div>
              <div className="h-2 bg-purple-400 rounded-full"></div>
              <div className="h-2 bg-purple-300 rounded-full"></div>
              <div className="h-2 bg-purple-200 rounded-full"></div>
            </div>
            <div className="mt-4">
              <p className="text-purple-600 font-medium">145 days remaining</p>
              <p className="text-sm text-gray-500">12 Monday, Oct 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}