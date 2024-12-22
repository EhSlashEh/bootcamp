import copy
import random
from collections import Counter

class Hat:
    
    def __init__(self, **kwargs):
        self.contents = []
        for color, amount in kwargs.items():
            self.contents.extend([color] * amount)

    def draw(self, ballsDrawn):
        if ballsDrawn >= len(self.contents):
            drawResult = self.contents.copy()
            self.contents.clear()
        else:
            drawResult = random.sample(self.contents, ballsDrawn)
            for ball in drawResult:
                self.contents.remove(ball)
        return drawResult

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    M = 0
    expectedList = [color for color, count in expected_balls.items() for _ in range(count)]

    for _ in range(num_experiments):
        hatCopy = copy.deepcopy(hat)
        drawList = hatCopy.draw(num_balls_drawn)
        if compare_lists(drawList, expectedList):
            M += 1

    return M / num_experiments

def compare_lists(list1, list2):
    count1 = Counter(list1)
    count2 = Counter(list2)
    return all(count1[ball] >= count2[ball] for ball in count2)

# Example usage
hat1 = Hat(yellow=3, blue=2, green=6)
hat2 = Hat(red=5, orange=4)
hat3 = Hat(red=5, orange=4, black=1, blue=0, pink=2, striped=9)
hat4 = Hat(black=6, red=4, green=3)

print(experiment(hat4, {'red': 2, 'green': 1}, 5, 2000))
