# Task Master 

## Tech Stack

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Language:** TypeScript
- **Validation:** class-validator & class-transformer

### Frontend
- **Framework:** Next.js 
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
