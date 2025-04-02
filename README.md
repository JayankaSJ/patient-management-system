# Patient Management System

A simple Patient Management System designed to manage and track patient data. This project consists of a **frontend** and **backend** that work together to provide a complete solution.

## Project Structure

- **/frontend**: Contains the client-side application that interacts with the user.
- **/backend**: Contains the server-side application that handles business logic and communicates with the database.
- **docker-compose.yml**: Used to define and run multi-container Docker applications. It sets up the frontend, backend, and any other services (like databases).

## Prerequisites

Make sure you have the following tools installed:

- [Docker](https://www.docker.com/get-started) (for containerization)
- [Docker Compose](https://docs.docker.com/compose/install/) (to manage multi-container applications)
- A modern web browser (for accessing the frontend)

## Setup and Installation

Clone the project to your local machine:

```bash
git clone https://github.com/JayankaSJ/patient-management-system.git
cd patient-management-system
docker-compose build
docker-compose up
```

Once completed application will be served on http://localhost/login

### Sample Usernames and Passwords

- **Read-Only User**

  - **Username**: `user`
  - **Password**: `password`

- **Admin User**
  - **Username**: `admin`
  - **Password**: `password`

## Technologies Used

- **Frontend**: Angular 19.2.0
- **Backend**: .NET 8.0
- **Database**: mssql/server:2019
- **Docker**: For containerization and environment setup

## Services Overview

### 1. **Backend Service**

- **Build Configuration**:
  - **Context**: `./backend`
  - **Dockerfile**: `Dockerfile`
- **Ports**:
  - `8080:8080`
- **Dependencies**:
  - Depends on `database` service.
- **Networks**:
  - Connected to the `backend_network`.

### 2. **Frontend Service**

- **Build Configuration**:
  - **Context**: `./frontend`
  - **Dockerfile**: `Dockerfile`
- **Ports**:
  - `80:80`
- **Networks**:
  - Connected to the `backend_network`.

### 3. **Database Service**

- **Image**: `mcr.microsoft.com/mssql/server:2019-latest`
- **Ports**:
  - `1433:1433`
- **Networks**:
  - Connected to the `backend_network`.

### 4. Networks

- **backend_network**:
  - **Driver**: `bridge`
  - This network is shared between the backend, frontend, and database services.

## TODO

### Backend

- Add unit tests for core logic (e.g., API endpoints, database interactions).
- Implement integration tests for API communication and database transactions.

### Frontend

- Add unit tests for individual UI components and functionality.
- Implement integration tests for frontend-backend communication.

## Troubleshooting

#### Backend Fails to Connect to Database

**Issue**: The backend service cannot connect to the database because the database is not fully ready when the backend starts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
