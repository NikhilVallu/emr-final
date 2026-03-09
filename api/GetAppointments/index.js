const { getContainer } = require('../shared/db');

// Mock Data for fallback
const mockAppointments = [
    { id: "1", time: '08:00 AM', patient: 'Doe, John', mrn: '123456', age: '45 M', type: 'Follow-up', complaint: 'Hypertension check', status: 'Arrived', provider: 'Smith, MD', room: '101' },
    { id: "2", time: '08:15 AM', patient: 'Smith, Jane', mrn: '789012', age: '32 F', type: 'Acute', complaint: 'Sore throat', status: 'Roomed', provider: 'Smith, MD', room: '102' },
    { id: "3", time: '08:30 AM', patient: 'Johnson, Bob', mrn: '345678', age: '58 M', type: 'Physical', complaint: 'Annual Exam', status: 'Scheduled', provider: 'Smith, MD', room: '' },
    { id: "4", time: '09:00 AM', patient: 'Williams, Sarah', mrn: '901234', age: '28 F', type: 'Follow-up', complaint: 'Anxiety', status: 'Completed', provider: 'Smith, MD', room: '101' },
    { id: "5", time: '09:15 AM', patient: 'Brown, Mike', mrn: '567890', age: '62 M', type: 'Consult', complaint: 'Knee pain', status: 'No Show', provider: 'Smith, MD', room: '' },
];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for Appointments.');

    try {
        const container = await getContainer("patients"); // Ensure we use the patients container where we put mixed models

        if (req.method === 'POST') {
            // Create a new appointment
            const newAppointment = req.body;
            if (!newAppointment || !newAppointment.patient) {
                context.res = { status: 400, body: { error: "Invalid appointment data. 'patient' is required." } };
                return;
            }

            // Assign a unique ID if one wasn't provided
            newAppointment.id = newAppointment.id || new Date().getTime().toString();
            newAppointment.type = 'appointment';
            newAppointment.status = newAppointment.status || 'Scheduled';

            if (container) {
                await container.items.create(newAppointment);
                context.res = { status: 201, body: newAppointment };
            } else {
                // If in mock mode
                mockAppointments.push(newAppointment);
                context.res = { status: 201, body: newAppointment };
            }
        } else {
            // GET request
            let appointments = mockAppointments;

            if (container) {
                // Query DB for appointments if connection exists
                const { resources } = await container.items.query("SELECT * FROM c WHERE c.type = 'appointment'").fetchAll();
                if (resources && resources.length > 0) {
                    appointments = resources;
                }
            }

            context.res = {
                body: appointments
            };
        }
    } catch (error) {
        context.log.error("Error with appointments:", error);
        context.res = {
            status: 500,
            body: { error: "Error processing the appointment request." }
        };
    }
}

