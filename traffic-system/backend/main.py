import asyncio
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from simulation.grid import Grid
from simulation.traffic_generator import TrafficGenerator
from simulation.intersection import LightState
from algorithms.greedy import GreedyAlgorithm
from algorithms.base import BaseAlgorithm

app = FastAPI(title="Adaptive Traffic Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrafficSystem:
    def __init__(self):
        self.grid = Grid(width=3, height=3)
        self.generator = TrafficGenerator(3, 3)
        self.algorithm: BaseAlgorithm = GreedyAlgorithm()
        self.vehicles = []
        self.active = True
        self.tick_rate = 1.0
        self.is_rush_hour = False
        self.clients: List[WebSocket] = []

    def toggle_rush_hour(self):
        self.is_rush_hour = not self.is_rush_hour
        return self.is_rush_hour

    def trigger_emergency(self):
        vehicle = self.generator.spawn_vehicle(is_emergency=True, is_rush_hour=self.is_rush_hour)
        self.vehicles.append(vehicle)
        start_node = vehicle.get_current_target()
        if start_node:
            intersection = self.grid.get_intersection(start_node[0], start_node[1])
            if intersection:
                intersection.enqueue("NORTH", vehicle)

    def set_algorithm(self, name: str):
        if name.lower() == "greedy":
            self.algorithm = GreedyAlgorithm()
        else:
            return False
        return True

    def toggle_speed(self):
        self.tick_rate = 0.2 if self.tick_rate == 1.0 else 1.0
        return self.tick_rate

    def simulate_step(self):
        spawn_chance = 0.4 if self.is_rush_hour else 0.15
        import random
        if random.random() < spawn_chance:
            vehicle = self.generator.spawn_vehicle(is_rush_hour=self.is_rush_hour)
            self.vehicles.append(vehicle)
            target = vehicle.get_current_target()
            if target:
                intersection = self.grid.get_intersection(target[0], target[1])
                if intersection:
                    intersection.enqueue(random.choice(["NORTH", "SOUTH", "EAST", "WEST"]), vehicle)

        self.algorithm.update_signals(self.grid.get_all_intersections())

        for intersection in self.grid.get_all_intersections():
            if intersection.state["N_S"] == LightState.GREEN and not intersection.transitioning:
                for direction in ["NORTH", "SOUTH"]:
                    vehicle = intersection.dequeue(direction)
                    if vehicle:
                        vehicle.advance_target()
                        next_target = vehicle.get_current_target()
                        if next_target:
                            next_int = self.grid.get_intersection(next_target[0], next_target[1])
                            if next_int:
                                next_int.enqueue("NORTH", vehicle)
                        else:
                            if vehicle in self.vehicles:
                                self.vehicles.remove(vehicle)

            if intersection.state["E_W"] == LightState.GREEN and not intersection.transitioning:
                for direction in ["EAST", "WEST"]:
                    vehicle = intersection.dequeue(direction)
                    if vehicle:
                        vehicle.advance_target()
                        next_target = vehicle.get_current_target()
                        if next_target:
                            next_int = self.grid.get_intersection(next_target[0], next_target[1])
                            if next_int:
                                next_int.enqueue("EAST", vehicle)
                        else:
                            if vehicle in self.vehicles:
                                self.vehicles.remove(vehicle)

            for direction in ["NORTH", "SOUTH", "EAST", "WEST"]:
                for v in intersection.queues[direction]:
                    v.increment_wait_time()

    def get_state(self):
        total_wait = sum(v.wait_time for v in self.vehicles) if self.vehicles else 0
        avg_wait = total_wait / len(self.vehicles) if self.vehicles else 0
        total_density = sum(i.get_density() for i in self.grid.get_all_intersections())
        
        return {
            "grid": self.grid.to_dict(),
            "metrics": {
                "active_vehicles": len(self.vehicles),
                "avg_wait_time": round(avg_wait, 2),
                "congestion_index": total_density,
                "rush_hour": self.is_rush_hour,
                "tick_rate": self.tick_rate,
                "algorithm": self.algorithm.__class__.__name__
            }
        }

system = TrafficSystem()

async def simulation_loop():
    while True:
        if system.active:
            system.simulate_step()
            state = system.get_state()
            state_json = json.dumps(state)
            
            disconnected = []
            for client in system.clients:
                try:
                    await client.send_text(state_json)
                except Exception:
                    disconnected.append(client)
            
            for d in disconnected:
                system.clients.remove(d)

        await asyncio.sleep(system.tick_rate)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulation_loop())

@app.get("/api/state")
def get_state():
    return system.get_state()

@app.post("/api/control/rush-hour")
def toggle_rush_hour():
    return {"rush_hour": system.toggle_rush_hour()}

@app.post("/api/control/emergency")
def trigger_emergency():
    system.trigger_emergency()
    return {"status": "Emergency vehicle dispatched"}

@app.post("/api/control/speed")
def toggle_speed():
    return {"tick_rate": system.toggle_speed()}

@app.post("/api/control/algorithm/{name}")
def set_algorithm(name: str):
    success = system.set_algorithm(name)
    return {"success": success, "algorithm": name}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    system.clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        system.clients.remove(websocket)
