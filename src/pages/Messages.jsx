import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import {
    Inbox,
    FileText,
    FlaskConical,
    MessageSquare,
    Phone,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

const Messages = () => {
    const [activeFolder, setActiveFolder] = useState('Results');

    const folders = [
        { id: 'Results', label: 'Results', icon: FlaskConical, count: 3 },
        { id: 'PtMsgs', label: 'Patient Msgs', icon: MessageSquare, count: 5 },
        { id: 'Refill', label: 'Rx Refills', icon: FileText, count: 2 },
        { id: 'Staff', label: 'Staff Msgs', icon: Inbox, count: 0 },
        { id: 'Telephone', label: 'Telephone', icon: Phone, count: 1 },
    ];

    const messages = [
        { id: 1, type: 'Result', patient: 'Doe, John', subject: 'Lipid Panel - Final', date: '10/26/2023', priority: 'Normal', status: 'Unread' },
        { id: 2, type: 'Result', patient: 'Smith, Jane', subject: 'CBC - Critical High', date: '10/26/2023', priority: 'High', status: 'Unread' },
        { id: 3, type: 'Result', patient: 'Johnson, Bob', subject: 'MRI Lumbar Spine', date: '10/25/2023', priority: 'Normal', status: 'Read' },
    ];

    return (
        <div className="flex h-[calc(100vh-8rem)] -m-4">
            {/* Folder List Sidebar */}
            <aside className="w-56 bg-gray-100 border-r border-gray-300 flex flex-col">
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-bold text-gray-700 flex items-center">
                        <Inbox className="h-4 w-4 mr-2" /> In Basket
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {folders.map(folder => {
                        const Icon = folder.icon;
                        return (
                            <button
                                key={folder.id}
                                onClick={() => setActiveFolder(folder.id)}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                                    activeFolder === folder.id
                                        ? "bg-blue-100 text-blue-800 font-bold"
                                        : "text-gray-700 hover:bg-gray-200"
                                )}
                            >
                                <div className="flex items-center">
                                    <Icon className="h-4 w-4 mr-2 opacity-70" />
                                    {folder.label}
                                </div>
                                {folder.count > 0 && (
                                    <span className={cn(
                                        "text-xs px-1.5 py-0.5 rounded-full",
                                        activeFolder === folder.id ? "bg-blue-200 text-blue-900" : "bg-gray-300 text-gray-700"
                                    )}>
                                        {folder.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* Message List */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Toolbar */}
                <div className="h-10 border-b border-gray-300 bg-gray-50 flex items-center px-4 space-x-2">
                    <button className="text-xs font-medium bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" /> Done
                    </button>
                    <button className="text-xs font-medium bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-orange-500" /> Postpone
                    </button>
                    <div className="h-4 w-px bg-gray-300 mx-2" />
                    <span className="text-xs text-gray-500">Showing all {activeFolder} messages</span>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-8"></TableHead>
                                <TableHead className="w-32">Priority</TableHead>
                                <TableHead className="w-48">Patient</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="w-32">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeFolder === 'Results' ? (
                                messages.map((msg) => (
                                    <TableRow key={msg.id} className={cn("cursor-pointer", msg.status === 'Unread' ? "font-bold bg-white" : "bg-gray-50 text-gray-600")}>
                                        <TableCell>
                                            {msg.status === 'Unread' && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                                        </TableCell>
                                        <TableCell>
                                            {msg.priority === 'High' && <span className="text-red-600 flex items-center"><span className="text-xs mr-1">!</span> High</span>}
                                            {msg.priority === 'Normal' && <span className="text-gray-500">Normal</span>}
                                        </TableCell>
                                        <TableCell>{msg.patient}</TableCell>
                                        <TableCell>{msg.subject}</TableCell>
                                        <TableCell>{msg.date}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No messages in {activeFolder}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Message Preview (Bottom Pane) */}
                <div className="h-1/3 border-t border-gray-300 bg-gray-50 p-4 overflow-auto">
                    <div className="bg-white border border-gray-200 rounded p-4 shadow-sm max-w-3xl">
                        <h3 className="font-bold text-gray-800 mb-2">Lipid Panel - Final</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-semibold">Patient:</span> Doe, John (45M)</p>
                            <p><span className="font-semibold">Result Date:</span> 10/26/2023 08:30 AM</p>
                            <div className="mt-4 border-t border-gray-100 pt-2">
                                <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                                    <div className="font-bold">Component</div>
                                    <div className="font-bold">Value</div>
                                    <div className="font-bold">Ref Range</div>

                                    <div>Cholesterol, Total</div>
                                    <div className="text-red-600 font-bold">240 H</div>
                                    <div>&lt; 200 mg/dL</div>

                                    <div>Triglycerides</div>
                                    <div>145</div>
                                    <div>&lt; 150 mg/dL</div>

                                    <div>HDL Cholesterol</div>
                                    <div>45</div>
                                    <div>&gt; 40 mg/dL</div>

                                    <div>LDL Cholesterol</div>
                                    <div className="text-red-600 font-bold">160 H</div>
                                    <div>&lt; 100 mg/dL</div>
                                </div>
                            </div>
                            <div className="mt-4 bg-yellow-50 p-2 rounded border border-yellow-200">
                                <p className="text-xs font-bold text-yellow-800 mb-1">Provider Note:</p>
                                <p className="text-xs text-gray-700">Patient needs to restart statin therapy. Will send message.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
