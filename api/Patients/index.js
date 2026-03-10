const { getContainer } = require('../shared/db');

// Mock data fallback
const mockPatientsList = [
    { id: "1", name: 'Doe, John', age: 45, gender: 'Male', phone: '555-0123', lastVisit: '10/15/2023', type: 'patient' },
    { id: "2", name: 'Smith, Jane', age: 32, gender: 'Female', phone: '555-0124', lastVisit: '10/20/2023', type: 'patient' },
    { id: "3", name: 'Johnson, Bob', age: 58, gender: 'Male', phone: '555-0125', lastVisit: '10/22/2023', type: 'patient' }
];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for Patients list.');

    try {
        const container = await getContainer("patients");

        if (req.method === 'POST') {
            const newPatient = req.body;
            
            // Generate basic ID safely
            newPatient.id = newPatient.id || new Date().getTime().toString();
            newPatient.type = 'patient';
            
            // Add required default properties for PatientDetails to not crash
            newPatient.allergies = newPatient.allergies || [];
            newPatient.problems = newPatient.problems || [];
            newPatient.medications = newPatient.medications || [];
            newPatient.encounters = newPatient.encounters || [];
            newPatient.pcp = newPatient.pcp || "Unassigned";
            newPatient.dob = newPatient.dob || "01/01/1990";
            newPatient.mrn = newPatient.mrn || Math.floor(100000 + Math.random() * 900000).toString();

            if (container) {
                await container.items.create(newPatient);
                context.res = {
                    status: 201,
                    headers: { "Content-Type": "application/json" },
                    body: newPatient
                };
            } else {
                // If in mock mode
                mockPatientsList.push(newPatient);
                context.res = {
                    status: 201,
                    headers: { "Content-Type": "application/json" },
                    body: newPatient
                };
            }
        } else {
            // GET request
            if (container) {
                // Fetch only items labeled as 'patient' or legacy items without a type. 
                // Ignore 'appointment' items that live in the same container.
                const querySpec = {
                    query: "SELECT * from c WHERE c.type = 'patient' OR NOT IS_DEFINED(c.type)"
                };
                const { resources: patients } = await container.items.query(querySpec).fetchAll();

                context.res = {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                    body: patients
                };
            } else {
                context.res = {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                    body: mockPatientsList
                };
            }
        }
    } catch (error) {
        context.log.error("Error fetching/creating patients:", error);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: "Failed to process patients request" }
        };
    }
}
