import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, Calendar, Activity, FileText, FlaskConical, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = [
        { label: 'Total Patients', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Appointments Today', value: '12', icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Active Treatments', value: '45', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    const openCharts = [
        { id: 1, name: 'Doe, John', mrn: '123456', time: '10:30 AM', reason: 'HTN Follow-up', status: 'In Room' },
        { id: 2, name: 'Smith, Jane', mrn: '789012', time: '09:15 AM', reason: 'Sore Throat', status: 'Signed' },
        { id: 3, name: 'Johnson, Bob', mrn: '345678', time: 'Yesterday', reason: 'Physical', status: 'Draft' },
    ];

    const resultsToReview = [
        { id: 1, patient: 'Williams, Sarah', test: 'Lipid Panel', date: 'Today', flag: 'High', value: 'LDL 160' },
        { id: 2, patient: 'Brown, Mike', test: 'CBC', date: 'Yesterday', flag: 'Normal', value: 'WNL' },
        { id: 3, patient: 'Doe, John', test: 'X-Ray Chest', date: '10/24', flag: 'Abnormal', value: 'Infiltrate' },
    ];

    return (
        <div className="space-y-6">
            {/* Top Stats Row */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Welcome back, Dr. Smith</h2>
                    <p className="text-sm text-gray-500">Here's what's happening today.</p>
                </div>
                <div className="flex space-x-3">
                    <Link to="/appointments">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow flex items-center transition-colors">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Appointment
                        </button>
                    </Link>
                    <Link to="/patients">
                        <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-2 px-4 rounded shadow-sm flex items-center transition-colors">
                            <Users className="h-4 w-4 mr-2" />
                            Add Patient
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                                    {stat.label}
                                </CardTitle>
                                <div className={`p-2 rounded-full ${stat.bg}`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* My Open Charts Widget */}
                <Card className="col-span-4 shadow-md border-t-4 border-t-blue-600">
                    <CardHeader className="bg-gray-50 border-b border-gray-200 py-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold text-gray-800 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                                My Open Charts
                            </CardTitle>
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">3 Active</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {openCharts.map((chart) => (
                                <div key={chart.id} className="flex items-center justify-between p-4 hover:bg-blue-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm group-hover:bg-blue-200">
                                            {chart.name.charAt(0)}
                                        </div>
                                        <div>
                                            <Link to={`/patients/${chart.id}`} className="font-bold text-gray-800 hover:text-blue-700 hover:underline">
                                                {chart.name}
                                            </Link>
                                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                                <span className="font-mono mr-2">{chart.mrn}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
                                                <span>{chart.reason}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block mb-1
                                            ${chart.status === 'In Room' ? 'bg-green-100 text-green-700' :
                                                chart.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                            {chart.status}
                                        </div>
                                        <div className="text-xs text-gray-400 flex items-center justify-end">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {chart.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Results to Review Widget */}
                <Card className="col-span-3 shadow-md border-t-4 border-t-red-500">
                    <CardHeader className="bg-gray-50 border-b border-gray-200 py-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-bold text-gray-800 flex items-center">
                                <FlaskConical className="mr-2 h-5 w-5 text-red-500" />
                                Results to Review
                            </CardTitle>
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {resultsToReview.map((result) => (
                                <div key={result.id} className="p-4 hover:bg-red-50/30 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm text-gray-700">{result.test}</span>
                                        <span className="text-xs text-gray-500">{result.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-blue-600 font-medium hover:underline">{result.patient}</span>
                                        {result.flag !== 'Normal' ? (
                                            <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                {result.value}
                                            </span>
                                        ) : (
                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                {result.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
