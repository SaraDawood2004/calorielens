import React, { useEffect, useState } from "react";

function CalorieRing({ calories }) {

const radius = 90
const stroke = 12
const normalizedRadius = radius - stroke * 0.5
const circumference = normalizedRadius * 2 * Math.PI

const maxCalories = 3000
const percent = Math.min(calories / maxCalories, 1)

const strokeDashoffset = circumference - percent * circumference

const [display,setDisplay] = useState(0)

useEffect(()=>{

let start = 0
const duration = 1200
const step = Math.ceil(calories/(duration/20))

const timer = setInterval(()=>{

start += step

if(start >= calories){
start = calories
clearInterval(timer)
}

setDisplay(start)

},20)

return ()=>clearInterval(timer)

},[calories])

return(

<div className="calorie-ring-container">

<svg
height={radius*2}
width={radius*2}
>

{/* Remaining ring (white) */}

<circle
stroke="#ffffff"
fill="transparent"
strokeWidth={stroke}
r={normalizedRadius}
cx={radius}
cy={radius}
/>

{/* Filled calories */}

<circle
stroke="#16a34a"
fill="transparent"
strokeWidth={stroke}
strokeLinecap="round"
strokeDasharray={`${circumference} ${circumference}`}
style={{
strokeDashoffset,
transition:"stroke-dashoffset 1.2s ease"
}}
r={normalizedRadius}
cx={radius}
cy={radius}
/>

</svg>

<div className="ring-text">

<h2>{display}</h2>
<span>kcal</span>

</div>

</div>

)

}

export default CalorieRing