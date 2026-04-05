import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { generateNutritionInsight, generateMealPlan } from "../ai/Agent";
import CalorieRing from "../components/CalorieRing";
import "../styles/dailycalorie.css";

function DailyCaloriePage(){

const [form,setForm] = useState({
age:"",
height:"",
weight:"",
gender:"",
activity:""
})

const [calories,setCalories] = useState(null)
const [mealPlan,setMealPlan] = useState([])
const [insight,setInsight] = useState("")

const [nutrition,setNutrition] = useState({
protein:0,
carbs:0,
fats:0,
fiber:0,
water:0
})

useEffect(()=>{

const handleMove = (e)=>{

const particles = document.querySelectorAll(".particle")

const x = e.clientX / window.innerWidth
const y = e.clientY / window.innerHeight

particles.forEach((p,i)=>{

const speed = (i+1)*2

const moveX = (x * speed)
const moveY = (y * speed)

p.style.transform = `translate(${moveX}px,${moveY}px)`

})

}

window.addEventListener("mousemove",handleMove)

return ()=> window.removeEventListener("mousemove",handleMove)

},[])
const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const calculateCalories=()=>{

const {age,height,weight,gender,activity}=form

if(!age || !height || !weight || !gender || !activity){
alert("Please fill all fields")
return
}

let bmr

if(gender==="male"){
bmr = 10*weight + 6.25*height - 5*age + 5
}else{
bmr = 10*weight + 6.25*height - 5*age - 161
}

let factor=1

if(activity==="light") factor=1.375
if(activity==="moderate") factor=1.55
if(activity==="active") factor=1.725
if(activity==="very") factor=1.9

const dailyCalories=Math.round(bmr*factor)
setCalories(dailyCalories)

/* Macronutrients */

const protein = Math.round((dailyCalories*0.30)/4)
const carbs = Math.round((dailyCalories*0.45)/4)
const fats = Math.round((dailyCalories*0.25)/9)

/* Fiber */

const fiber = Math.round((dailyCalories/1000)*14)

/* Water */

const water = (weight*0.035).toFixed(1)

setNutrition({
protein,
carbs,
fats,
fiber,
water
})

/* AI Meal Plan */

const plan = generateMealPlan(dailyCalories)
setMealPlan(plan)

/* AI Insight */

const aiInsight = generateNutritionInsight({
age,
weight,
height,
gender,
activity,
calories: dailyCalories
})

setInsight(aiInsight)

}


return(

<div>

<Navbar/>

<div className="calorie-page">
<div className="food-particles">

<img className="particle p1" src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"/>
<img className="particle p2" src="https://cdn-icons-png.flaticon.com/512/135/135620.png"/>
<img className="particle p3" src="https://cdn-icons-png.flaticon.com/512/2922/2922037.png"/>
<img className="particle p4" src="https://cdn-icons-png.flaticon.com/512/590/590685.png"/>
<img className="particle p5" src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"/>
<img className="particle p6" src="https://cdn-icons-png.flaticon.com/512/685/685352.png"/>
<img className="particle p7" src="https://cdn-icons-png.flaticon.com/512/1046/1046751.png"/>
<img className="particle p8" src="https://cdn-icons-png.flaticon.com/512/1046/1046769.png"/>
<img className="particle p9" src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"/>
<img className="particle p10" src="https://cdn-icons-png.flaticon.com/512/135/135620.png"/>


</div>

<div className="hero-section">

<h1 className="title">Discover Your Daily Calorie Needs</h1>

<p className="subtitle">
Enter your body metrics and activity level to generate a personalized nutrition target.
</p>

</div>

{/* INPUT GRID */}

<div className="card-grid">

<div className="card-row row-3">

<div className="input-card">
<img src="https://img.icons8.com/color/96/birthday.png" alt="age"/>
<h3>Age</h3>
<input
type="number"
name="age"
placeholder="Enter age"
value={form.age}
onChange={handleChange}
/>
</div>

<div className="input-card">
<img src="https://img.icons8.com/color/96/height.png" alt="height"/>
<h3>Height</h3>
<input
type="number"
name="height"
placeholder="Height (cm)"
value={form.height}
onChange={handleChange}
/>
</div>

<div className="input-card">
<img src="https://img.icons8.com/color/96/scale.png" alt="weight"/>
<h3>Weight</h3>
<input
type="number"
name="weight"
placeholder="Weight (kg)"
value={form.weight}
onChange={handleChange}
/>
</div>

</div>

<div className="card-row row-2">

<div className="input-card">
<img src="https://img.icons8.com/color/96/gender.png" alt="gender"/>
<h3>Gender</h3>
<select
name="gender"
value={form.gender}
onChange={handleChange}
>
<option value="">Select</option>
<option value="male">Male</option>
<option value="female">Female</option>
</select>
</div>

<div className="input-card">
<img src="https://img.icons8.com/color/96/running.png" alt="activity"/>
<h3>Activity</h3>
<select
name="activity"
value={form.activity}
onChange={handleChange}
>
<option value="">Select level</option>
<option value="light">Lightly Active</option>
<option value="moderate">Moderately Active</option>
<option value="active">Active</option>
<option value="very">Very Active</option>
</select>
</div>

</div>

</div>

<div className="calculate-row">
<button onClick={calculateCalories}>Calculate Now</button>
</div>

{/* RESULT */}

{calories && (

<div className="result-section">

<h2>Your Daily Calorie Target</h2>

{/* ONLY CALORIE VISUALIZATION */}

 <CalorieRing calories={calories}/>
{/* NUTRITION TABLE */}

<h3>Recommended Daily Nutrition Intake</h3>

<table className="nutrition-table">

<thead>
<tr>
<th>Category</th>
<th>Nutrient</th>
<th>Recommended Intake</th>
</tr>
</thead>

<tbody>

<tr>
<td rowSpan="3">Macronutrients</td>
<td>Protein</td>
<td>{nutrition.protein} g</td>
</tr>

<tr>
<td>Carbohydrates</td>
<td>{nutrition.carbs} g</td>
</tr>

<tr>
<td>Fats</td>
<td>{nutrition.fats} g</td>
</tr>

<tr>
<td rowSpan="2">Micronutrients</td>
<td>Vitamins</td>
<td>A, B-complex, C, D, E</td>
</tr>

<tr>
<td>Minerals</td>
<td>Iron, Calcium, Magnesium, Zinc</td>
</tr>

<tr>
<td>Fiber</td>
<td>Dietary Fiber</td>
<td>{nutrition.fiber} g</td>
</tr>

<tr>
<td>Hydration</td>
<td>Water Intake</td>
<td>{nutrition.water} Liters</td>
</tr>

</tbody>

</table>

{/* MEAL PLAN */}

<h3>AI Suggested Meal Plan</h3>

<ul>
{mealPlan.map((meal,i)=>(
<li key={i}>{meal}</li>
))}
</ul>

{/* AI INSIGHT */}

<div className="ai-insight">

<h3>CalorieLens AI Insight</h3>

<p>{insight}</p>

</div>

</div>

)}

</div>

<footer className="footer">
<p>© 2026 CalorieLens — AI Nutrition Platform</p>
</footer>

</div>

)

}

export default DailyCaloriePage