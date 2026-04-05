export function generateNutritionInsight(data){

const {age, weight, height, gender, activity, calories} = data

let insight = ""

if(calories < 1800){
insight =
"Your calorie requirement is relatively moderate. Focus on nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins to maintain steady energy levels."
}
else if(calories < 2300){
insight =
"Your calorie target supports a balanced daily lifestyle. Maintaining this intake will help sustain metabolism and support healthy body function."
}
else{
insight =
"Your calorie requirement is relatively high, which usually indicates higher physical activity. Ensure adequate protein intake to support muscle recovery and performance."
}

if(activity === "very"){
insight += " Since you are highly active, hydration and sufficient carbohydrate intake will help maintain endurance."
}
if(age < 25){
insight += " At your age, maintaining balanced nutrition and consistent activity helps build long-term metabolic health."
}
return insight

}



export function generateMealPlan(calories){

if(calories < 1800){
return [
"Breakfast: Oatmeal with banana and almonds",
"Lunch: Brown rice with lentils and mixed vegetables",
"Snack: Greek yogurt with nuts",
"Dinner: Grilled paneer or chicken salad"
]
}

else if(calories < 2300){
return [
"Breakfast: Eggs with whole wheat toast and fruit",
"Lunch: Rice with grilled chicken or paneer and vegetables",
"Snack: Protein smoothie with nuts",
"Dinner: Quinoa bowl with vegetables"
]
}

else{
return [
"Breakfast: Peanut butter toast, eggs, and milk",
"Lunch: Rice with chicken curry and vegetables",
"Snack: Protein smoothie and fruit",
"Dinner: Pasta or quinoa with lean protein"
]
}
}