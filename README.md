# Platform game - speed calculation

A simple Typescript server to calculate the final spped of the player

## Prerequisites

Before you begin, ensure you have the following installed on your system.

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd platformer_game
    ```

2.  **Set up environment variables:**

    This project uses environment variables for configuration. Create a `.env` file by copying the example file. This file is ignored by Git and will contain your local configuration and secrets.

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and update the variables (like database credentials, API keys, etc.) as needed for your local setup.

## Running the Application

You can run the application using Docker Compose or directly on your local machine.

### Using Docker Compose

This is the recommended way to run the project for development, as it automatically sets up all the required services in isolated containers.
It benefits the deployment to AWS by uploading to ECR and deploy to ECS.


1.  **Build and start the services:**

    From the root of the project, run:
    ```bash
    docker-compose up --build
    ```

    - `--build`: Forces a build of the Docker images before starting the containers.

2.  **Check the logs:**

    To see the real-time logs:
    ```bash
    docker-compose logs -f
    ```

3.  **Stopping the services:**

    To stop and remove the containers, networks, and volumes:
    ```bash
    docker-compose down
    ```

The application should now be accessible at `http://localhost:3000/health` for health check. Check your `.env` or `docker-compose.yml` file for the correct port.

### Running Directly

If you prefer not to use Docker, you can run the application directly on your machine.

1.  **Install dependencies:**

    Navigate to the project directory and install the required packages. *(Adjust the command based on your project's package manager).*

    ```bash
    npm install
    ```

2.  **Start the server (dev env):**

    ```bash
    npm run dev
    ```

3.  **Start the server (prod env):**

    ```bash
    npm run build
    npm run start
    ```

The server will start, and you can access the application at at `http://localhost:3000/health` for health check.

### Sending POST Request Demo

Now you can send the POST request to get the final speed of the player

1. **Get final speed of the player**

    ```bash
    curl --location --request POST 'http://localhost:3000/calculate' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "initialSpeed": 60,
        "inclines": [0, 30, 0, -45, 0]
    }'
    ```

    response will be like the following
    ```json
    {
        "finalSpeed": 75
    }
    ```