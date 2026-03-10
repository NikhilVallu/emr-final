import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Plus, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../components/ui/Dialog';

const Patients = () => {
    const [patients, setPatients] = useState([
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-0123', lastVisit: '2023-10-15' },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0124', lastVisit: '2023-10-20' },
        { id: 3, name: 'Robert Johnson', age: 58, gender: 'Male', phone: '555-0125', lastVisit: '2023-10-22' },
    ]);
    const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        insuranceProvider: '',
        policyNumber: '',
        groupNumber: '',
        lastVisit: new Date().toISOString().split('T')[0]
    });

    const handleAddPatient = () => {
        const patient = {
            id: patients.length + 1,
            ...newPatient
        };
        setPatients([...patients, patient]);
        setIsAddPatientOpen(false);
        setNewPatient({
            name: '',
            age: '',
            gender: '',
            phone: '',
            insuranceProvider: '',
            policyNumber: '',
            groupNumber: '',
            lastVisit: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                <Button onClick={() => setIsAddPatientOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients..." className="pl-8" />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.lastVisit}</TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/patients/${patient.id}?tab=Notes`} className="mr-2">
                                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">Write Note</Button>
                                    </Link>
                                    <Link to={`/patients/${patient.id}`}>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                        <DialogClose onClick={() => setIsAddPatientOpen(false)} />
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input
                                    id="name"
                                    value={newPatient.name}
                                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="age" className="text-sm font-medium">Age</label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={newPatient.age}
                                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                                <select
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newPatient.gender}
                                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                <Input
                                    id="phone"
                                    value={newPatient.phone}
                                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="border-t my-2"></div>
                        <div className="text-sm font-bold">Insurance Details</div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <label htmlFor="insuranceProvider" className="text-sm font-medium">Provider</label>
                                <Input
                                    id="insuranceProvider"
                                    value={newPatient.insuranceProvider}
                                    onChange={(e) => setNewPatient({ ...newPatient, insuranceProvider: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="policyNumber" className="text-sm font-medium">Policy #</label>
                                <Input
                                    id="policyNumber"
                                    value={newPatient.policyNumber}
                                    onChange={(e) => setNewPatient({ ...newPatient, policyNumber: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="groupNumber" className="text-sm font-medium">Group #</label>
                                <Input
                                    id="groupNumber"
                                    value={newPatient.groupNumber}
                                    onChange={(e) => setNewPatient({ ...newPatient, groupNumber: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddPatient}>Save Patient</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Patients;
