import uuid
from typing import List, Tuple

class Vehicle:
    def __init__(self, id: str, path: List[Tuple[int, int]], is_emergency: bool = False):
        self.id = id if id else str(uuid.uuid4())
        self.path = path  # List of intersection (x, y) coordinates it needs to visit
        self.current_target_index = 0
        self.is_emergency = is_emergency
        self.wait_time = 0
        self.total_time = 0
        self.active = True

    def get_current_target(self) -> Tuple[int, int]:
        if self.current_target_index < len(self.path):
            return self.path[self.current_target_index]
        return None

    def advance_target(self):
        self.current_target_index += 1
        if self.current_target_index >= len(self.path):
            self.active = False
            self.wait_time = 0 # reset upon exit or completion

    def increment_wait_time(self):
        self.wait_time += 1
        self.total_time += 1

    def increment_total_time(self):
        self.total_time += 1

    def to_dict(self):
        target = self.get_current_target()
        return {
            "id": self.id,
            "target": {"x": target[0], "y": target[1]} if target else None,
            "is_emergency": self.is_emergency,
            "wait_time": self.wait_time
        }
