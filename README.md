# Task Master (Next.js + NestJS Fullstack Todo App)

A professional, full-stack Todo application built with modern web technologies. This project features a NestJS REST API backend connected to a PostgreSQL database, and a Next.js (App Router) frontend styled with Tailwind CSS.

## Tech Stack

### Backend
- **Framework:** NestJS 10
- **Database:** PostgreSQL 16
- **ORM:** TypeORM
- **Language:** TypeScript
- **Validation:** class-validator & class-transformer

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

### Infrastructure
- **Containerization:** Docker Compose (for PostgreSQL)
- **Package Manager:** Yarn

## Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose (for running the PostgreSQL database)

## Installation Steps

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   \`\`\`

2. **Start the database:**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. **Install Backend Dependencies:**
   \`\`\`bash
   cd backend
   yarn install
   \`\`\`

4. **Install Frontend Dependencies:**
   \`\`\`bash
   cd ../frontend
   yarn install
   \`\`\`

## How to Run

1. **Start the Backend server:**
   Open a terminal, navigate to the \`backend\` directory, and run:
   \`\`\`bash
   yarn start:dev
   \`\`\`
   The API will be available at \`http://localhost:4000\`.

2. **Start the Frontend development server:**
   Open a new terminal, navigate to the \`frontend\` directory, and run:
   \`\`\`bash
   yarn dev
   \`\`\`
   The application will be available at \`http://localhost:3000\`.

## API Endpoints Table

The backend exposes a RESTful API for managing tasks under the \`/todos\` prefix.

| Method   | Endpoint       | Description                  | Request Body (Example)                               |
| :------- | :------------- | :--------------------------- | :--------------------------------------------------- |
| \`GET\`    | \`/todos\`       | Fetch all todos              | *None*                                               |
| \`GET\`    | \`/todos/:id\`   | Fetch a specific todo by ID  | *None*                                               |
| \`POST\`   | \`/todos\`       | Create a new todo            | \`{ "title": "Buy milk", "description": "2% fat" }\` |
| \`PATCH\`  | \`/todos/:id\`   | Update an existing todo      | \`{ "completed": true, "title": "Buy oat milk" }\`   |
| \`DELETE\` | \`/todos/:id\`   | Delete a todo                | *None*                                               |

## Project Structure

- \`backend/\`: Contains the NestJS REST API source code.
- \`frontend/\`: Contains the Next.js React frontend source code.
- \`docker-compose.yml\`: Docker configuration for the localized PostgreSQL database.
