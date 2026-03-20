# Adaptive Traffic Management System

A full-stack simulation of an adaptive traffic signal control system for a 3x3 urban network. Built with Python (FastAPI), React (Vite+Tailwind CSS), and WebSocket for real-time visualization.

## Architecture

- **Backend**: FastAPI simulation loop ticking every 1.0s (or 0.2s in Fast mode), updating vehicle positions and intersections. Uses a Greedy Density-Based algorithm to minimize congestion.
- **Frontend**: React SPA using Tailwind CSS to render a 3x3 grid, incoming vehicle queues, and signal states. Communicates with the backend exclusively via WebSockets for state and REST for controls.
- **Orchestration**: `docker-compose` spins up the backend on port `8000` and the frontend on port `5173`.

## Features

- **Real-Time Visualization**: 3x3 grid with active signal states and queue indicators.
- **Greedy Traffic Algorithm**: Intersections proactively switch to green for the path with the highest density/queue size to minimize wait times.
- **Rush Hour Toggle**: Dynamically increases average vehicle spawn rate.
- **Emergency Dispatch**: Spawns an emergency vehicle and gives it priority routing.
- **Metrics Dashboard**: Tracks grid congestion, wait times, and throughput live.

## How to Run

1. Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
2. Open a terminal in the root directory where `docker-compose.yml` resides.
3. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
4. Access the Dashboard: [http://localhost:5173](http://localhost:5173)
5. Access the Backend API documentation (Swagger UI): [http://localhost:8000/docs](http://localhost:8000/docs)
