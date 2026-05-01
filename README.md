# Saal

Saal is a comprehensive bus ticket booking and management system designed to streamline transportation services. The platform enables bus operators to manage routes, stations, schedules, and ticket sales while providing customers with an intuitive interface to search, book, and purchase bus tickets.

## Features

- Route management with multiple stations and scheduling
- Real-time bus availability and ticket booking
- Highlighted routes for featured travel options
- Station management across different cities
- Travel schedule administration with work day configuration
- Admin dashboard for system management
- RESTful API backend with Symfony
- Modern React frontend with responsive design

## Download

### Releases

You can download the latest stable release from the GitHub releases page:

1. Visit the project's GitHub repository
2. Navigate to the "Releases" section
3. Download the latest stable version archive (ZIP or TAR.GZ)
4. Extract the archive to your desired location

### Source Code

To get the latest development version:

```bash
git clone https://github.com/yourusername/saal.git
cd saal
```

## Usage

Saal is ideal for a variety of transportation and ticketing scenarios:

### Bus Operating Companies
- Manage multiple routes across different regions
- Schedule regular and seasonal trips
- Track bus fleet availability and maintenance schedules
- Generate revenue reports and ticket sales analytics

### Travel Agencies
- Resell bus tickets to customers
- Manage group bookings and special rates
- Track booking confirmations and cancellations

### Tourism and Tour Operators
- Organize chartered bus services
- Manage multi-day itineraries with scheduled stops
- Highlight premium routes and exclusive travel packages

### Corporate Transportation
- Organize employee shuttle services
- Manage regular commute routes
- Track attendance and usage patterns

## Building

### Prerequisites

- Docker and Docker Compose
- Git
- Node.js (for local frontend development without Docker)
- PHP 8.4+ (for local backend development without Docker)

### Quick Start with Docker

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/saal.git
cd saal
```

2. Start all services together:

```bash
docker compose up --build
```

This will start the database, backend (Symfony API), and frontend (React) services in a single command.

3. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`
   - Database: Port 5432 (internal)

4. To stop all services:

```bash
docker compose down
```

### Individual Service Management

If you need to work with individual services or run migrations:

#### Backend

To run backend migrations after the stack is running:

```bash
docker compose exec app php bin/console doctrine:migrations:migrate
```

#### Frontend

To rebuild only the frontend:

```bash
docker compose up --build frontend
```

#### Database

To reset the database:

```bash
docker compose down
docker compose up --build db backend frontend
```

## Environment Configuration

Each service has its own configuration:

- Backend: See `backend/.env` for Symfony configuration
- Frontend: Configure API endpoint in frontend source code
- Database: Adjust connection settings in `db/compose.yaml`

## Documentation

Detailed documentation for each component is available in their respective directories:

- Backend API documentation: `backend/README.md`
- Frontend documentation: `frontend/README.md`
- Database schema: `db/init.sql`

## Support

For issues, feature requests, or questions, please open an issue on the GitHub repository.
