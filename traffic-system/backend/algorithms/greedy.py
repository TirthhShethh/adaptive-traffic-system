from .base import BaseAlgorithm
from typing import List
from simulation.intersection import Intersection, LightState

class GreedyAlgorithm(BaseAlgorithm):
    def update_signals(self, intersections: List[Intersection]):
        for intersection in intersections:
            if intersection.transitioning:
                intersection.yellow_timer += 1
                if intersection.yellow_timer >= 2:
                    intersection.transitioning = False
                    intersection.timer = 0
                    if intersection.state["N_S"] == LightState.YELLOW:
                        intersection.state["N_S"] = LightState.RED
                        intersection.state["E_W"] = LightState.GREEN
                    else:
                        intersection.state["E_W"] = LightState.RED
                        intersection.state["N_S"] = LightState.GREEN
                continue

            ns_queue = len(intersection.queues["NORTH"]) + len(intersection.queues["SOUTH"])
            ew_queue = len(intersection.queues["EAST"]) + len(intersection.queues["WEST"])

            should_switch = False
            if intersection.timer > 15:
                should_switch = True
            elif intersection.state["N_S"] == LightState.GREEN and ew_queue > ns_queue and intersection.timer >= 3:
                should_switch = True
            elif intersection.state["E_W"] == LightState.GREEN and ns_queue > ew_queue and intersection.timer >= 3:
                should_switch = True

            if should_switch:
                intersection.transitioning = True
                intersection.yellow_timer = 0
                if intersection.state["N_S"] == LightState.GREEN:
                    intersection.state["N_S"] = LightState.YELLOW
                else:
                    intersection.state["E_W"] = LightState.YELLOW
            else:
                intersection.timer += 1
