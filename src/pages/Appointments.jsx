import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Schedule Data
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                // Fallback or error handling
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Arrived': return 'bg-green-100 text-green-800 border-green-200';
            case 'Roomed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'No Show': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-50 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] -m-4">
            {/* Calendar Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-300 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-700">October 2023</h2>
                    <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
                {/* Mock Mini Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-6">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-bold text-gray-400">{d}</div>)}
                    {Array.from({ length: 31 }, (_, i) => (
                        <div key={i} className={cn(
                            "p-1 rounded-full cursor-pointer hover:bg-gray-100",
                            i + 1 === 25 ? "bg-blue-600 text-white font-bold hover:bg-blue-700" : "text-gray-700"
                        )}>
                            {i + 1}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-gray-700 text-sm">Department</h3>
                    <div className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked readOnly className="rounded text-blue-600" />
                        <span>Family Medicine</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span>Pediatrics</span>
                    </div>
                </div>
            </aside>

            {/* Main Schedule Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-300 bg-gray-50 flex items-center justify-between px-4">
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="bg-white">
                            <CalendarIcon className="mr-2 h-4 w-4" /> Today
                        </Button>
                        <div className="h-6 w-px bg-gray-300 mx-2" />
                        <span className="font-bold text-gray-700">Wednesday, Oct 25, 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="bg-white">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Add Appt
                        </Button>
                    </div>
                </div>

                {/* Schedule Grid */}
                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-24">Time</TableHead>
                                    <TableHead className="w-20">Status</TableHead>
                                    <TableHead className="w-48">Patient</TableHead>
                                    <TableHead className="w-24">MRN</TableHead>
                                    <TableHead className="w-20">Age/Sex</TableHead>
                                    <TableHead className="w-32">Type</TableHead>
                                    <TableHead>Chief Complaint</TableHead>
                                    <TableHead className="w-24">Room</TableHead>
                                    <TableHead className="w-32">Provider</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedule.map((appt) => (
                                    <TableRow key={appt.id} className="hover:bg-blue-50 cursor-pointer">
                                        <TableCell className="font-bold text-gray-700 flex items-center">
                                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                            {appt.time}
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", getStatusColor(appt.status))}>
                                                {appt.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/patients/${appt.id}`} className="font-bold text-blue-700 hover:underline">
                                                {appt.patient}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-gray-500 font-mono text-xs">{appt.mrn}</TableCell>
                                        <TableCell>{appt.age}</TableCell>
                                        <TableCell>{appt.type}</TableCell>
                                        <TableCell className="font-medium text-gray-800">{appt.complaint}</TableCell>
                                        <TableCell className="font-bold text-gray-700">{appt.room}</TableCell>
                                        <TableCell className="text-gray-600 text-xs">{appt.provider}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Schedule Stats Footer */}
                <div className="h-8 bg-gray-100 border-t border-gray-300 flex items-center px-4 text-xs text-gray-500 space-x-4">
                    <span>Total: 5</span>
                    <span>Arrived: 1</span>
                    <span>Roomed: 1</span>
                    <span>Completed: 1</span>
                    <span>No Show: 1</span>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
