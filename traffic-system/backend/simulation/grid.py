from .intersection import Intersection
from typing import Dict, Tuple

class Grid:
    def __init__(self, width: int = 3, height: int = 3):
        self.width = width
        self.height = height
        # Map of (x, y) -> Intersection
        self.intersections: Dict[Tuple[int, int], Intersection] = {}

        for x in range(width):
            for y in range(height):
                int_id = f"int_{x}_{y}"
                self.intersections[(x, y)] = Intersection(id=int_id, x=x, y=y)

    def get_intersection(self, x: int, y: int) -> Intersection:
        return self.intersections.get((x, y))

    def get_all_intersections(self) -> list:
        return list(self.intersections.values())

    def to_dict(self):
        return {
            "width": self.width,
            "height": self.height,
            "intersections": [i.to_dict() for i in self.intersections.values()]
        }
