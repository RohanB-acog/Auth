"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Building, 
  Clock, 
  Shield,
  Laptop,
  Globe,
  Download,
  Phone,
  Calendar,
  GraduationCap,
  Award,
  Edit2
} from "lucide-react";
import { ProfileEditDialog } from './components/ProfileEditDialog';

interface ProfileData {
  user: {
    email: string;
    created_at: string;
  };
  sessions: Array<{
    device: string;
    browser: string;
    location: string;
    ip_address: string;
    timestamp: string;
  }>;
  preferences?: {
    phone: string;
    working_hours: string;
    time_zone: string;
    preferred_tools: string;
    updated_at: string;
  };
}

export default function ProfilePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Not Authenticated</h1>
          <p className="text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  const firstName = profileData.user.email.split('@')[0].split('.')[0];
  const lastName = profileData.user.email.split('@')[0].split('.')[1] || '';
  const fullName = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;

  const userInfo = {
    phone: profileData.preferences?.phone || '',
    workingHours: profileData.preferences?.working_hours || '9:00 AM - 6:00 PM',
    timeZone: profileData.preferences?.time_zone || 'IST (GMT+5:30)',
    preferredTools: profileData.preferences?.preferred_tools?.split(',').filter(Boolean) || ['JupyterLab', 'PyMOL', 'BLAST', 'R Studio']
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">Profile Settings</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Overview */}
          <div className="col-span-12 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                    {fullName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
                    <p className="text-gray-500">Bioinformatics Scientist</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {profileData.user.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {userInfo.phone || 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Professional Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Professional Information</CardTitle>
                  <span className="text-sm text-gray-500">(Company Managed)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Department</h4>
                    <p className="mt-1">Research & Development</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Position</h4>
                    <p className="mt-1">Bioinformatics Scientist</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Specialization</h4>
                    <p className="mt-1">Molecular Modeling, Drug Discovery</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                    <p className="mt-1">5+ years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Login Sessions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Recent Login Sessions</CardTitle>
                <CardDescription>Your last 5 authentication records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.sessions.map((session, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Laptop className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-gray-500">{session.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {new Date(session.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(session.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                        <span>
                          <Globe className="h-4 w-4 inline mr-1" />
                          {session.browser}
                        </span>
                        <span>IP: {session.ip_address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Personal Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Working Hours</p>
                    <p className="font-medium">{userInfo.workingHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Zone</p>
                    <p className="font-medium">{userInfo.timeZone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preferred Tools</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userInfo.preferredTools.map((tool, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add extra security</p>
                        </div>
                      </div>
                      <Button size="sm">Enable</Button>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-gray-500">Automatic logout after inactivity</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">10 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(profileData.user.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Profile Update</p>
                    <p className="font-medium">
                      {profileData.preferences?.updated_at 
                        ? new Date(profileData.preferences.updated_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'Never'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ProfileEditDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          fetchProfileData(); // Refresh data after dialog closes
        }}
        userInfo={userInfo}
      />
    </div>
  );
}