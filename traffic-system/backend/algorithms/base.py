from abc import ABC, abstractmethod
from typing import List
from simulation.intersection import Intersection

class BaseAlgorithm(ABC):
    @abstractmethod
    def update_signals(self, intersections: List[Intersection]):
        pass
