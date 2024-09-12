# Reservation Chall

## Description

This project is a REST API for managing reservations, developed with Node.js using the NestJS framework, and written in TypeScript. It interacts with a MongoDB database using Mongoose and is containerized using Docker. The API allows CRUD and filter operations on reservations. The frontend is developed using ReactJS, Redux Toolkit, and communicates with the API through Axios.

## Features

- RESTful API for managing reservations.
- Interaction with MongoDB using Mongoose.
- Modular architecture with NestJS, including client, service, role, user, and reservation modules.
- Frontend built with ReactJS, Redux Toolkit for state management.
- Full Docker support for easy deployment.

## Requirements

Before running the project, make sure you have the following installed:

- Docker
- Docker Compose

## Installation and Running with Docker

Since Docker is handling the installation of dependencies, you can directly build and run the project using the following steps.

### 1. Clone the repository.

```bash
git clone https://github.com/wjtrucido/challenge-app.git

cd challenge-app
```

### 2. Run Docker Desktop.

### 3. Run the following command:

```bash
docker-compose up --build
```

With this command the necessary dependencies are downloaded and the backend, database and frontend will be automatically started.

- The backend will listen on port 5000
- The frontend will listen on port 5173
- The database will listen on port: 27017

### 4. Run Docker Desktop.

Now you can use the app.
In the browser enter the url:

```bash
localhost:5173
```

Ready :-) There are already services and clients loaded in the database, you just have to proceed to add reservations.

## Comments

This solution is based on the following scenario: "the hotel/store/business administrator is the one who receives the reservation request (for example, a phone call) and then registers the reservation in the software."

Due to time constraints, I wasn't able to add all the functionalities I would have liked: Below, I will specify what I would add:

- Implementation of the 'Auth' module.
- Implementation of the 'Configuration' module: to be able to configure time intervals for reservations (currently, the time interval is taken from a configuration that doesn't have a CRUD interface; it can be manually changed in the file 'backend/src/config/configuration.ts'). By default, it is set to 30 minutes.
- Calendar blocking configuration.
- Implementation of unit tests.
- Implementation of CI/CD.
- Documentation.

#### License

This project is licensed under the MIT License.

#### Author

Washingto Trucido, [LinkedIn](www.linkedin.com/in/washington-javier-trucido-ba3229169)
