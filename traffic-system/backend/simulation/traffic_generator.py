import random
import uuid
from typing import List, Tuple
from .vehicle import Vehicle

class TrafficGenerator:
    def __init__(self, grid_width: int, grid_height: int):
        self.grid_width = grid_width
        self.grid_height = grid_height

    def generate_random_path(self, length: int) -> List[Tuple[int, int]]:
        start_x = random.randint(0, self.grid_width - 1)
        start_y = random.randint(0, self.grid_height - 1)

        path = [(start_x, start_y)]
        curr_x, curr_y = start_x, start_y

        # Simple random walk to adjacent nodes
        for _ in range(length - 1):
            possible_moves = []
            if curr_x > 0: possible_moves.append((-1, 0))
            if curr_x < self.grid_width - 1: possible_moves.append((1, 0))
            if curr_y > 0: possible_moves.append((0, -1))
            if curr_y < self.grid_height - 1: possible_moves.append((0, 1))

            if not possible_moves:
                break

            dx, dy = random.choice(possible_moves)
            next_pos = (curr_x + dx, curr_y + dy)
            
            # Prevent simple backtracking
            if next_pos not in path:
                path.append(next_pos)
                curr_x, curr_y = next_pos
            else:
                break

        return path

    def spawn_vehicle(self, is_emergency: bool = False, is_rush_hour: bool = False) -> Vehicle:
        path_length = random.randint(3, 5) if is_rush_hour else random.randint(2, 4)
        path = self.generate_random_path(path_length)
        if not path:
             path = [(0,0)]
        return Vehicle(id=str(uuid.uuid4())[:8], path=path, is_emergency=is_emergency)
