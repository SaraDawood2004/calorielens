from nutrient_db import nutrient_mapping

def get_nutrients(food, quantity):

    if food not in nutrient_mapping:
        return None

    data = nutrient_mapping[food]


    nutrients = {
        "carbs": data["carbs"] * quantity,
        "protein": data["protein"] * quantity,
        "fat": data["fat"] * quantity
    }

    return nutrients