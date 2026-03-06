# Deploying EMR Application to Azure

This guide explains how to deploy the EMR application "live" on Azure using **Azure Static Web Apps** and **Azure Cosmos DB** for the "real database".

## Prerequisites

1.  **Azure Account**: [Create a free account](https://azure.microsoft.com/free/).
2.  **GitHub Account**: You need to push this code to a GitHub repository.
3.  **VS Code** (Recommended) with **Azure Static Web Apps** extension.

---

## Step 1: Set up the Real Database (Azure Cosmos DB)

1.  Log in to the [Azure Portal](https://portal.azure.com).
2.  Click **Create a resource** and search for **Azure Cosmos DB**.
3.  Select **Azure Cosmos DB for NoSQL**.
4.  Choose the **Free Tier** if available to save costs.
5.  Once created, go to **Data Explorer**.
6.  Click **New Container**.
    *   **Database id**: `emr-db`
    *   **Container id**: `patients`
    *   **Partition key**: `/id`
7.  Go to **Keys** in the left menu.
8.  Copy the **PRIMARY CONNECTION STRING**. You will need this later.

---

## Step 2: Push Code to GitHub

1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Push your code to the new repository.

---

## Step 3: Deploy to Azure Static Web Apps

1.  In the Azure Portal, search for **Static Web Apps**.
2.  Click **Create**.
3.  **Basics**:
    *   **Subscription**: Your subscription.
    *   **Resource Group**: Create a new one (e.g., `emr-rg`).
    *   **Name**: `emr-app-live`.
    *   **Plan Type**: Free.
    *   **Deployment details**: Select **GitHub**.
    *   **Organization/Repository/Branch**: Select the repo you just created.
4.  **Build Details**:
    *   **Build Presets**: Select `React`.
    *   **App location**: `/` (root of your project).
    *   **Api location**: `api` (where we created the Azure Functions).
    *   **Output location**: `dist` (default for Vite).
5.  Click **Review + create** -> **Create**.

---

## Step 4: Connect the Database

1.  Once the deployment is complete, click **Go to resource**.
2.  In the left menu, select **Environment variables** (or **Configuration** in older views).
3.  Click **Add** (or **New application setting**).
4.  **Name**: `COSMOS_DB_CONNECTION_STRING`
5.  **Value**: Paste the connection string you copied in Step 1.
6.  Click **Apply** / **Save**.

**Note**: The backend APIs (`api/GetAppointments`, `api/GetPatientDetails`) are designed to fall back to **mock data** if the database connection fails or is not configured. This ensures your app works immediately after deployment!

To populate your real database, you can use the Data Explorer in the Azure Portal to Upload the sample JSON data found in `api/GetPatientDetails/index.js` or `src/pages/PatientDetails.jsx`.

## Step 5: Test Live

1.  Click the **Browse** button in the Overview tab of your Static Web App.
2.  Your EMR system is now live on the internet!
3.  Navigate to **Appointments** or **Patient Details** to see data being fetched from your API.
