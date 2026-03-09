import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Settings, Shield, Bell, LogOut } from 'lucide-react';

const Profile = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800">User Profile</h2>
                <Button variant="destructive" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Information Card */}
                <Card className="shadow-md border-t-4 border-t-blue-600">
                    <CardHeader>
                        <CardTitle className="flex items-center text-gray-800">
                            <User className="mr-2 h-5 w-5 text-blue-600" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-blue-200">
                                JS
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">John Smith, MD</h3>
                                <p className="text-sm text-gray-500">Family Medicine</p>
                                <p className="text-xs text-gray-400">Provider ID: 123456</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                <p className="text-sm font-medium text-gray-800">john.smith@hospital.org</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                                <p className="text-sm font-medium text-gray-800">555-0199</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Department</label>
                                <p className="text-sm font-medium text-gray-800">Main Clinic - West Wing</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                                <p className="text-sm font-medium text-gray-800">Attending Physician</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings & Preferences */}
                <div className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center text-sm text-gray-700">
                                <Settings className="mr-2 h-4 w-4" />
                                System Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">Default Login Department</span>
                                <span className="text-sm font-bold text-blue-600 cursor-pointer">Family Medicine</span>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">Theme</span>
                                <span className="text-sm font-bold text-blue-600 cursor-pointer">Nebula Light</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center text-sm text-gray-700">
                                <Bell className="mr-2 h-4 w-4" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">Critical Lab Alerts</span>
                                <div className="h-4 w-8 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 h-3 w-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">In Basket Messages</span>
                                <div className="h-4 w-8 bg-green-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 h-3 w-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center text-sm text-gray-700">
                                <Shield className="mr-2 h-4 w-4" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" className="w-full">Change Password</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
