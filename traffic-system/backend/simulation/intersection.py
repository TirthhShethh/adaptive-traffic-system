from enum import Enum
from typing import Dict, List

class LightState(Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"

class Intersection:
    def __init__(self, id: str, x: int, y: int):
        self.id = id
        self.x = x
        self.y = y
        # 2-phase signal: North-South phase and East-West phase
        self.state = {
            "N_S": LightState.RED,
            "E_W": LightState.GREEN
        }
        # Vehicles arriving from each direction (waiting to enter the intersection)
        self.queues: Dict[str, List] = {
            "NORTH": [],
            "SOUTH": [],
            "EAST": [],
            "WEST": []
        }
        self.timer = 0    # Tracks how long the current phase has been active
        self.yellow_timer = 0
        self.transitioning = False

    def enqueue(self, direction: str, vehicle):
        self.queues[direction].append(vehicle)

    def dequeue(self, direction: str):
        if self.queues[direction]:
            return self.queues[direction].pop(0)
        return None

    def get_density(self) -> int:
        return sum(len(q) for q in self.queues.values())

    def to_dict(self):
        return {
            "id": self.id,
            "x": self.x,
            "y": self.y,
            "state": {k: v.value for k, v in self.state.items()},
            "queue_lengths": {k: len(v) for k, v in self.queues.items()},
            "density": self.get_density()
        }
