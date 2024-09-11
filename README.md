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

### License

[MIT License](LICENSE)
