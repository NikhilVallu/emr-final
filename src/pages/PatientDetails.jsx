import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import {
    ArrowLeft,
    FileText,
    Activity,
    AlertTriangle,
    Thermometer,
    Heart,
    Pill,
    Stethoscope,
    ClipboardList,
    FlaskConical,
    Plus,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const PatientDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Chart Review');
    const [abnormalSystems, setAbnormalSystems] = useState({});

    const toggleAbnormal = (system) => {
        setAbnormalSystems(prev => ({
            ...prev,
            [system]: !prev[system]
        }));
    };

    // Mock data
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await fetch(`/api/patients/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Failed to fetch patient:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPatient();
        }
    }, [id]);

    const tabs = ['Snapshot', 'Chart Review', 'Notes', 'Orders', 'Flowsheets'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!patient) {
        return <div className="p-4">Patient not found</div>;
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] -m-4">
            {/* Storyboard (Left Sidebar) */}
            <aside className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col overflow-y-auto">
                {/* Patient Header */}
                <div className="bg-blue-100 p-3 border-b border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-bold text-blue-900 truncate">{patient.name}</h2>
                        <span className="text-xs font-bold text-blue-800 bg-blue-200 px-1 rounded">{patient.gender.charAt(0)}</span>
                    </div>
                    <div className="text-xs text-blue-800 space-y-0.5">
                        <p><span className="font-semibold">DOB:</span> {patient.dob} ({patient.age}y)</p>
                        <p><span className="font-semibold">MRN:</span> {patient.mrn}</p>
                    </div>
                </div>

                {/* Vitals / Quick Info */}
                <div className="p-2 space-y-2">
                    <div className="bg-white border border-gray-300 rounded p-2 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gray-700">Allergies</span>
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {patient.allergies.map(a => (
                                <span key={a} className="text-[10px] bg-red-100 text-red-800 px-1 rounded border border-red-200 font-medium">{a}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-300 rounded p-2 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gray-700">Problem List</span>
                            <ClipboardList className="h-3 w-3 text-gray-500" />
                        </div>
                        <ul className="text-[11px] text-gray-800 list-disc pl-3 space-y-0.5">
                            {patient.problems.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-300 rounded p-2 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-gray-700">Care Team</span>
                            <Stethoscope className="h-3 w-3 text-gray-500" />
                        </div>
                        <p className="text-[11px] text-gray-800"><span className="font-semibold">PCP:</span> {patient.pcp}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Activity Tabs */}
                <div className="flex items-end px-2 pt-2 border-b border-gray-300 bg-gray-50 space-x-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-t-md border border-b-0 transition-colors",
                                activeTab === tab
                                    ? "bg-white border-gray-300 text-blue-700 border-t-2 border-t-red-600 relative top-[1px]"
                                    : "bg-gray-200 border-gray-300 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Workspace Content */}
                <div className="flex-1 overflow-auto p-4">
                    {activeTab === 'Chart Review' && (
                        <div className="space-y-6">
                            {/* Chart Review Sub-tabs (Mock) */}
                            <div className="flex space-x-4 text-xs font-bold text-gray-600 border-b border-gray-200 pb-2 mb-4">
                                <span className="text-blue-700 border-b-2 border-blue-700 pb-2 cursor-pointer">Encounters</span>
                                <span className="hover:text-blue-700 cursor-pointer">Labs</span>
                                <span className="hover:text-blue-700 cursor-pointer">Imaging</span>
                                <span className="hover:text-blue-700 cursor-pointer">Meds</span>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-800 flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    Encounters
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Provider</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {patient.encounters.map((enc, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{enc.date}</TableCell>
                                                <TableCell className="font-medium">{enc.type}</TableCell>
                                                <TableCell>{enc.dept}</TableCell>
                                                <TableCell>{enc.provider}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="text-sm font-bold text-gray-800 flex items-center">
                                    <Pill className="h-4 w-4 mr-2 text-gray-500" />
                                    Active Medications
                                </h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Medication</TableHead>
                                            <TableHead>Dose</TableHead>
                                            <TableHead>Frequency</TableHead>
                                            <TableHead>Route</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {patient.medications.map((med, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-blue-700">{med.name}</TableCell>
                                                <TableCell>{med.dose}</TableCell>
                                                <TableCell>{med.freq}</TableCell>
                                                <TableCell>{med.route}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Notes' && (
                        <div className="flex h-full gap-4">
                            {/* Notes Sidebar */}
                            <div className="w-1/3 border-r border-gray-200 pr-4 flex flex-col">
                                <Button className="mb-4 w-full justify-start" variant="outline">
                                    <Plus className="mr-2 h-4 w-4" /> Create Note
                                </Button>
                                <div className="space-y-2 overflow-y-auto flex-1">
                                    {['Progress Note', 'H&P', 'Telephone Encounter'].map((note, i) => (
                                        <div key={i} className="p-3 border border-gray-200 rounded hover:bg-blue-50 cursor-pointer text-sm">
                                            <div className="font-bold text-gray-700">{note}</div>
                                            <div className="text-xs text-gray-500">10/15/2023 - Smith, MD</div>
                                            <div className="text-xs text-gray-400 mt-1 truncate">Patient presents with...</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Note Editor */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <div className="border border-gray-300 rounded-t-md bg-gray-100 p-2 flex items-center space-x-2 border-b-0">
                                    <span className="font-bold text-sm text-gray-700">Progress Note</span>
                                    <span className="text-xs text-gray-500">- Unsigned</span>
                                </div>
                                <div className="flex-1 border border-gray-300 flex flex-col overflow-hidden">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 uppercase">Subjective</label>
                                            <textarea
                                                className="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:border-blue-500 resize-none h-24"
                                                placeholder="Patient complaints..."
                                                defaultValue="Patient presents today for follow up of hypertension. Reports compliance with medications. No chest pain or shortness of breath."
                                            />
                                        </div>
                                        {/* Physical Exam SmartForm */}
                                        <div className="border border-gray-300 rounded bg-gray-50 p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-xs font-bold text-gray-700 uppercase">Physical Exam (SmartForm)</label>
                                                <Button size="sm" variant="outline" className="h-6 text-xs">Mark All WNL</Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {['Constitutional', 'Eyes', 'ENT', 'Neck', 'CV', 'Lungs', 'GI', 'Extremities', 'Neuro', 'Skin'].map(system => (
                                                    <div key={system} className={cn("bg-white border border-gray-200 rounded transition-all", abnormalSystems[system] ? "col-span-2" : "")}>
                                                        <div className="flex items-center justify-between p-2">
                                                            <span className="text-sm font-medium text-gray-700">{system}</span>
                                                            <div className="flex space-x-1">
                                                                <button
                                                                    className={cn("px-2 py-0.5 text-[10px] font-bold border rounded hover:bg-green-200", !abnormalSystems[system] ? "bg-green-100 text-green-800 border-green-200" : "bg-white text-gray-500 border-gray-200")}
                                                                    onClick={() => setAbnormalSystems(prev => ({ ...prev, [system]: false }))}
                                                                >
                                                                    WNL
                                                                </button>
                                                                <button
                                                                    className={cn("px-2 py-0.5 text-[10px] font-bold border rounded hover:bg-red-100", abnormalSystems[system] ? "bg-red-50 text-red-800 border-red-200" : "bg-white text-gray-500 border-gray-200")}
                                                                    onClick={() => toggleAbnormal(system)}
                                                                >
                                                                    Abn
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {abnormalSystems[system] && (
                                                            <div className="p-2 border-t border-gray-100 bg-red-50/30">
                                                                <textarea
                                                                    className="w-full text-xs border border-gray-300 rounded p-1 focus:outline-none focus:border-red-400"
                                                                    rows="2"
                                                                    placeholder={`Describe ${system} abnormalities...`}
                                                                    autoFocus
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 uppercase">Assessment & Plan</label>
                                            <textarea
                                                className="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:border-blue-500 resize-none h-32"
                                                placeholder="Assessment and Plan..."
                                                defaultValue="1. Hypertension, well controlled.&#10;   - Continue current medications.&#10;   - Follow up in 3 months.&#10;&#10;2. Health Maintenance&#10;   - Flu shot given today."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-300 border-t-0 rounded-b-md bg-gray-50 p-2 flex justify-end space-x-2">
                                    <Button variant="outline" size="sm">Save</Button>
                                    <Button size="sm">Sign</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Orders' && (
                        <div className="space-y-4">
                            {/* Order Search */}
                            <div className="bg-gray-100 p-4 rounded border border-gray-300">
                                <label className="block text-xs font-bold text-gray-700 mb-1">New Order</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search for medications, labs, imaging..."
                                            className="w-full border border-gray-300 rounded pl-8 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <Button size="sm">Browse</Button>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    {['CBC', 'CMP', 'Lipid Panel', 'Lisinopril', 'X-Ray Chest'].map(quick => (
                                        <button key={quick} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-blue-50 text-blue-700">
                                            + {quick}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Signed Orders */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-2">Active Orders (This Encounter)</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Ordered By</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Lipid Panel</TableCell>
                                            <TableCell>Sent</TableCell>
                                            <TableCell>Smith, MD</TableCell>
                                            <TableCell className="text-right text-blue-600 text-xs cursor-pointer">Modify</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'Chart Review' && activeTab !== 'Notes' && activeTab !== 'Orders' && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Activity className="h-12 w-12 mb-2 opacity-20" />
                            <p>Select a tab to view patient data.</p>
                            <p className="text-xs">(Placeholder for {activeTab})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
