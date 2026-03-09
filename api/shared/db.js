const { CosmosClient } = require("@azure/cosmos");

let client = null;
let database = null;
let containers = {}; // Cache containers by name

async function getContainer(containerName = "patients") {
    if (containers[containerName]) return containers[containerName];

    const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
    if (!connectionString) {
        console.warn(`No COSMOS_DB_CONNECTION_STRING found. Using mock data for ${containerName}.`);
        return null;
    }

    if (!client) {
        client = new CosmosClient(connectionString);
        await client.databases.createIfNotExists({ id: "emr-db" });
        database = client.database("emr-db");
    }
    
    // Create the container if it doesn't exist
    await database.containers.createIfNotExists({ id: containerName });
    containers[containerName] = database.container(containerName);

    return containers[containerName];
}

module.exports = { getContainer };
