# Project Setup Guide

This guide will help you set up the project, configure the environment, and run it locally or on Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Running the Project](#running-the-project)
5. [Hosting on Vercel](#hosting-on-vercel)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **PostgreSQL** (or access to a PostgreSQL instance)
- **Git** (for cloning the repository)

### Optional Tools

- **Postman** or **cURL** for API testing
- **VS Code** or your preferred code editor
- **Vercel CLI** for deployment

---

## Environment Setup

### 1. Clone the Repository

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/GlitchBanger/QuizAppSvelte.git
cd QuizAppSvelte
```

### 2. Install Dependencies

Install all necessary dependencies by running:

```bash
npm install
```

### 3. Configure the Environment Variables

Create a `.env` file in the root of the project, and add the following environment variables:

```bash
DATABASE_URL=postgres://username:password@dbhost.com:5432/dbname?sslmode=require
LOCAL_URL=https://localhost:3000
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
PGSSLMODE=no-verify
NODE_TLS_REJECT_UNAUTHORIZED='0'
```

- **PGSSLMODE** and **NODE_TLS_REJECT_UNAUTHORIZED** are optional, but can be useful when dealing with SSL certificate issues.
- Ensure you update the `DATABASE_URL` and other fields according to your PostgreSQL instance.

---

## Database Setup

### 1. Generate Drizzle Migrations

After setting the environment variables, run the following command to generate Drizzle migrations:

```bash
npm run generate
```

### 2. Apply Database Migrations

Once the migration files are generated, apply them to your PostgreSQL database:

```bash
npm run migrate
```

This will update the database schema as defined in your models.

---

## Running the Project

### 1. Start Development Server

To start the project in development mode with hot-reloading:

```bash
npm run dev
```

By default, the app should be accessible at `http://localhost:3000`.

### 2. Build for Production

To build the project for production:

```bash
npm run build
```

### 3. Preview Production Build

Once the project is built, you can preview it in production mode:

```bash
npm run preview
```

---

## Hosting on Vercel

If you wish to deploy the project to Vercel, follow these steps:

### 1. Install Vercel CLI

Make sure you have the Vercel CLI installed:

```bash
npm install -g vercel
```

### 2. Deploy to Vercel

Use the following command to deploy:

```bash
npx vercel
```

Follow the prompts, and your app will be deployed to Vercel.

---

## Troubleshooting

- **SSL Issues (SELF_SIGNED_CERT_IN_CHAIN)**: You may encounter this issue due to SSL certificates. You can disable SSL verification in development by using `NODE_TLS_REJECT_UNAUTHORIZED='0'` and `PGSSLMODE=no-verify`. This should not be done in production.

- **Database Connection Issues**: Ensure the PostgreSQL service is running and that the `DATABASE_URL` and other connection variables in `.env` are correct.

For any other issues, consult the project documentation or raise an issue in the project's [GitHub repository](https://github.com/GlitchBanger/QuizAppSvelte/issues).

---

# API Documentation

## Base URL

/api

## Routes

### `/students`

#### GET `/students`

- **Description:** Fetch all students.
- **Response:**
  - `200 OK`: Returns a list of all students.

### `/teachers`

#### GET `/teachers`

- **Description:** Fetch all teachers.
- **Response:**
  - `200 OK`: Returns a list of all teachers.

#### POST `/teachers`

- **Description:** Register a new teacher.
- **Request Body:**
  ```
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns the ID, name, and email of the newly created teacher.
  - `400 Bad Request`: Returns error details if the request body is invalid.
  - `500 Internal Server Error`: Returns error details if the server fails to create the teacher.

#### POST `/teachers/login`

- **Description:** Authenticate a teacher.
- **Request Body:**
  ```
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns a success message if authentication is successful.
  - `401 Unauthorized`: Returns error details if authentication fails.
  - `500 Internal Server Error`: Returns error details if the server fails to authenticate.

### `/tests`

#### GET `/tests`

- **Description:** Fetch all tests or tests created by a specific user.
- **Query Parameters:**
  - `createdBy` (optional): Filter tests by the creator's ID.
- **Response:**
  - `200 OK`: Returns a list of tests.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch tests.

#### POST `/tests`

- **Description:** Create a new test.
- **Request Body:**
  ```
  {
    "title": "string"
  }
  ```
- **Query Parameters:**
  - `createdBy`: ID of the user creating the test.
- **Response:**
  - `200 OK`: Returns the ID of the newly created test.
  - `400 Bad Request`: Returns error details if `createdBy` is missing or the request body is invalid.
  - `500 Internal Server Error`: Returns error details if the server fails to create the test.

#### DELETE `/tests`

- **Description:** Delete a test.
- **Query Parameters:**
  - `testId`: ID of the test to be deleted.
- **Response:**
  - `200 OK`: Returns a success message if the test is deleted successfully.
  - `400 Bad Request`: Returns error details if `testId` is missing or invalid.
  - `404 Not Found`: Returns error details if the test is not found.
  - `500 Internal Server Error`: Returns error details if the server fails to delete the test.

### `/tests/questions`

#### GET `/tests/questions`

- **Description:** Fetch all questions or questions for a specific test.
- **Query Parameters:**
  - `testId` (optional): Filter questions by test ID.
- **Response:**
  - `200 OK`: Returns a list of questions.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch questions.

#### POST `/tests/questions`

- **Description:** Create a new question.
- **Request Body:**
  ```
  {
    "questionText": "string",
    "optionA": "string",
    "optionB": "string",
    "optionC": "string",
    "optionD": "string",
    "answerKey": "A" | "B" | "C" | "D"
  }
  ```
- **Query Parameters:**
  - `testId`: ID of the test to which the question belongs.
- **Response:**
  - `200 OK`: Returns the ID of the newly created question.
  - `400 Bad Request`: Returns error details if `testId` is missing or the request body is invalid.
  - `500 Internal Server Error`: Returns error details if the server fails to create the question.

#### PUT `/tests/questions`

- **Description:** Update an existing question.
- **Request Body:**
  ```
  {
    "questionText": "string",
    "optionA": "string",
    "optionB": "string",
    "optionC": "string",
    "optionD": "string",
    "answerKey": "A" | "B" | "C" | "D"
  }
  ```
- **Query Parameters:**
  - `questionId`: ID of the question to be updated.
- **Response:**
  - `200 OK`: Returns the updated question details.
  - `400 Bad Request`: Returns error details if `questionId` is missing or the request body is invalid.
  - `500 Internal Server Error`: Returns error details if the server fails to update the question.

#### DELETE `/tests/questions`

- **Description:** Delete a question.
- **Query Parameters:**
  - `questionId`: ID of the question to be deleted.
- **Response:**
  - `200 OK`: Returns a success message if the question is deleted successfully.
  - `400 Bad Request`: Returns error details if `questionId` is missing or invalid.
  - `404 Not Found`: Returns error details if the question is not found.
  - `500 Internal Server Error`: Returns error details if the server fails to delete the question.

### `/tests/createresponse`

#### GET `/tests/createresponse`

- **Description:** Create or fetch a test response for a student.
- **Query Parameters:**
  - `testId`: ID of the test.
  - `studentId`: ID of the student.
- **Response:**
  - `200 OK`: Returns the ID of the created or existing test response.
  - `400 Bad Request`: Returns error details if `testId` or `studentId` is missing.
  - `500 Internal Server Error`: Returns error details if the server fails to create or fetch the test response.

### `/tests/questionresponse`

#### GET `/tests/questionresponse`

- **Description:** Fetch all question responses.
- **Response:**
  - `200 OK`: Returns a list of all question responses.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch question responses.

### `/tests/testresponse`

#### GET `/tests/testresponse`

- **Description:** Fetch a specific test response with its question responses and correctness.
- **Query Parameters:**
  - `responseId`: ID of the test response.
- **Response:**
  - `200 OK`: Returns the test response details, including correctness of each question.
  - `400 Bad Request`: Returns error details if `responseId` is missing.
  - `404 Not Found`: Returns error details if the test response is not found.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch the test response details.

### `/tests/registerresponse`

#### POST `/tests/registerresponse`

- **Description:** Register or update a question response.
- **Request Body:**
  ```
  {
    "selectedOption": "A" | "B" | "C" | "D"
  }
  ```
- **Query Parameters:**
  - `responseId`: ID of the test response.
  - `questionId`: ID of the question.
- **Response:**
  - `200 OK`: Returns a success message if the response is registered or updated successfully.
  - `400 Bad Request`: Returns error details if `responseId` or `questionId` is missing.
  - `500 Internal Server Error`: Returns error details if the server fails to register or update the response.

### `/tests/testresponses`

#### GET `/tests/testresponses`

- **Description:** Fetch test responses with details for a specific test.
- **Query Parameters:**
  - `testId`: ID of the test.
- **Response:**
  - `200 OK`: Returns a list of test responses with student details and correctness.
  - `400 Bad Request`: Returns error details if `testId` is missing or invalid.
  - `404 Not Found`: Returns error details if no test responses are found.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch test responses.

### `/tests/answerkey`

#### GET `/tests/answerkey`

- **Description:** Fetch the answer key for a specific test response.
- **Query Parameters:**
  - `responseId`: ID of the test response.
- **Response:**
  - `200 OK`: Returns the answer key with selected options for the test response.
  - `400 Bad Request`: Returns error details if `responseId` is missing or invalid.
  - `404 Not Found`: Returns error details if the test response is not found.
  - `500 Internal Server Error`: Returns error details if the server fails to fetch the answer key.


### License

[MIT License](LICENSE)
