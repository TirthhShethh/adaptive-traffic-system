import asyncio
from simulation.grid import Grid
from simulation.traffic_generator import TrafficGenerator
from simulation.intersection import LightState
from algorithms.greedy import GreedyAlgorithm
from main import TrafficSystem

system = TrafficSystem()
for _ in range(100):
    system.simulate_step()
    system.get_state()
print("Simulation ran successfully without crashing.")
