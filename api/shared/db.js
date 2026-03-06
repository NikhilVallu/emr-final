const { CosmosClient } = require("@azure/cosmos");

let client = null;
let database = null;
let container = null;

async function getContainer() {
    if (container) return container;

    const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
    if (!connectionString) {
        console.warn("No COSMOS_DB_CONNECTION_STRING found. Using mock data.");
        return null;
    }

    if (!client) {
        client = new CosmosClient(connectionString);
        await client.databases.createIfNotExists({ id: "emr-db" });
        database = client.database("emr-db");
        await database.containers.createIfNotExists({ id: "patients" });
        container = database.container("patients");
    }
    return container;
}

module.exports = { getContainer };
