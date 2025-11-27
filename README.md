# Debugging Challenge: Employees Page

This repository contains a Next.js application with a new feature that has been implemented but contains several bugs. Your task is to identify and fix these bugs to make the feature work as intended.

## The Feature
An "Employees" page that lists employees with the following functionality:
-   Pagination (10 items per page)
-   Search by name or email
-   Filter by department
-   Display employee details in a table

## Setup
1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Seed the database (MongoDB):
    ```bash
    npx prisma db push
    npx prisma db seed
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

## Files of Interest
The following files contain known issues that you need to address:

-   `app/api/employees/route.ts`: API route for fetching employees.
-   `hooks/useEmployees.ts`: Custom hook for managing employee data fetching.
-   `app/employees/page.tsx`: The main page component.
-   `prisma/seed.ts`: Seed script (use this to populate your database).

## Instructions
-   **Work on this branch**. Do not switch branches.
-   Identify the bugs in the frontend and backend.
-   Fix the bugs to meet the feature requirements.
-   Ensure the code is robust and handles edge cases appropriately.
-   Pay attention to performance and best practices (e.g., proper dependency arrays, error handling).

Good luck!

