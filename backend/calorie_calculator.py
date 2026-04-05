from calorie_db import calories_per_serving

def calculate(food, quantity):

    if food not in calories_per_serving:
        return None

    return calories_per_serving[food] * quantity