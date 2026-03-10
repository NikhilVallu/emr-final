const { getContainer } = require('../shared/db');

// Mock Data for fallback
const mockPatients = {
    "1": {
        id: "1",
        name: 'Doe, John',
        mrn: '12345678',
        age: 45,
        gender: 'Male',
        dob: '05/15/1978',
        phone: '555-0123',
        pcp: 'Dr. Smith',
        allergies: ['Penicillin', 'Peanuts'],
        codeStatus: 'Full Code',
        problems: ['Hypertension', 'Type 2 Diabetes', 'Hyperlipidemia'],
        medications: [
            { name: 'Lisinopril', dose: '10mg', freq: 'Daily', route: 'PO' },
            { name: 'Metformin', dose: '500mg', freq: 'BID', route: 'PO' },
            { name: 'Atorvastatin', dose: '20mg', freq: 'Daily', route: 'PO' }
        ],
        encounters: [
            { date: '10/15/2023', type: 'Office Visit', dept: 'Family Med', provider: 'Smith, MD' },
            { date: '05/20/2023', type: 'Sick Visit', dept: 'Urgent Care', provider: 'Jones, NP' },
            { date: '01/10/2023', type: 'Annual Exam', dept: 'Family Med', provider: 'Smith, MD' }
        ]
    }
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for Patient Details.');
    const id = context.bindingData.id;

    try {
        const container = await getContainer();
        let patient = mockPatients[id];

        if (container) {
            try {
                // Cosmos DB throws a 404 error if the item doesn't exist
                const { resource } = await container.item(id, id).read();
                if (resource) {
                    patient = resource;
                }
            } catch (err) {
                if (err.code !== 404) {
                    throw err;
                }
            }
        }

        if (patient) {
            context.res = {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: patient
            };
        } else {
            // If fetching an ID not in our mock data, generate a generic one
            context.res = {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: {
                    id: id,
                    name: 'Guest Patient',
                    mrn: '000000',
                    age: 30,
                    gender: 'Unknown',
                    dob: '01/01/1990',
                    phone: '555-0000',
                    pcp: 'N/A',
                    allergies: [],
                    codeStatus: 'Full Code',
                    problems: [],
                    medications: [],
                    encounters: []
                }
            };
        }
    } catch (error) {
        context.log.error("Error fetching patient details:", error);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: { error: "Error fetching patient details", details: error.message || error.toString() }
        };
    }
}
