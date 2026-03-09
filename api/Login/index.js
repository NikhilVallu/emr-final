const { getContainer } = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a login request.');

    const { username, password } = req.body || {};

    if (!username || !password) {
        context.res = {
            status: 400,
            body: { error: "Please pass a username and password in the request body" }
        };
        return;
    }

    try {
        const container = await getContainer("users");

        if (container) {
            // Cosmos DB connection exists
            const querySpec = {
                query: "SELECT * from c WHERE c.username = @username AND c.password = @password",
                parameters: [
                    { name: "@username", value: username },
                    { name: "@password", value: password }
                ]
            };
            
            const { resources: users } = await container.items.query(querySpec).fetchAll();

            if (users && users.length > 0) {
                // Login successful
                context.res = {
                    status: 200,
                    body: { message: "Login successful", user: { id: users[0].id, username: users[0].username, role: users[0].role || 'user' } }
                };
            } else {
                // Login failed
                context.res = {
                    status: 401,
                    body: { error: "Invalid username or password" }
                };
            }
        } else {
            // Mock connection fallback: use a hardcoded mocked credential for local testing if DB not connected
            if (username === 'admin' && password === 'admin') {
                context.res = {
                    status: 200,
                    body: { message: "Mock Login successful", user: { id: "mock-1", username: "admin", role: "admin" } }
                };
            } else {
                context.res = {
                    status: 401,
                    body: { error: "Invalid Mock username or password. Try admin/admin" }
                };
            }
        }

    } catch (error) {
        context.log.error("Error during login:", error);
        context.res = {
            status: 500,
            body: { error: "An error occurred during login." }
        };
    }
}
