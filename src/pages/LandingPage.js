import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

function LandingPage() {


  const scrollToFeatures = () => {
    document.querySelector(".features").scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(()=>{

const canvas=document.getElementById("bg-animation")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let particles=[]

for(let i=0;i<50;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
d:Math.random()*1
})
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="rgba(255,255,255,0.5)"

particles.forEach(p=>{
ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fill()

p.y+=p.d

if(p.y>canvas.height){
p.y=0
p.x=Math.random()*canvas.width
}

})

requestAnimationFrame(draw)
}

draw()

},[])

  return (

    <div className="landing-container">

      <Navbar/>

      {/* HERO */}

      <section className="hero">

        <div className="hero-text">

          <h1>
            AI Powered
            <br />
            Nutrition Intelligence
          </h1>

          <p>
            Upload your food image and let CalorieLens instantly detect
            what you’re eating, calculate calories, and guide your
            health journey with AI-powered insights.
          </p>

          <div className="hero-buttons">

            <button
              className="secondary-btn"
              onClick={scrollToFeatures}
            >
              Know More
            </button>

          </div>

        </div>

      </section>


<section className="features">
  <canvas id="bg-animation"></canvas>

  <div className="chat-center-container">

    {/* Chat 1 LEFT */}
    <div className="chat-row left">
      <img
        src="https://cdn-icons-png.flaticon.com/512/766/766022.png"
        className="character"
        alt="broccoli avatar"
      />
      <div className="speech-bubble bubble-left">
        Hi! Ever wondered how many calories are in your meal?
      </div>
    </div>

    {/* Chat 2 RIGHT */}
    <div className="chat-row right">
      <div className="speech-bubble bubble-right">
        With CalorieLens, you can upload a food photo and get instant calorie info!
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/590/590685.png"
        className="character"
        alt="strawberry avatar"
      />
    </div>

    {/* Chat 3 LEFT */}
    <div className="chat-row left">
      <img
        src="https://cdn-icons-png.flaticon.com/512/766/766022.png"
        className="character"
        alt="broccoli avatar"
      />
      <div className="speech-bubble bubble-left">
        Tracking calories helps you maintain a healthy diet and avoid overeating.
      </div>
    </div>

    {/* Chat 4 RIGHT */}
    <div className="chat-row right">
      <div className="speech-bubble bubble-right">
        Monitoring intake improves energy and promotes better health.
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/590/590685.png"
        className="character"
        alt="strawberry avatar"
      />
    </div>

    {/* Chat 5 LEFT */}
    <div className="chat-row left">
      <img
        src="https://cdn-icons-png.flaticon.com/512/766/766022.png"
        className="character"
        alt="broccoli avatar"
      />
      <div className="speech-bubble bubble-left">
        CalorieLens makes calorie tracking simple and fun!
      </div>
    </div>

  </div>
</section>
  {/* KNOWLEDGE SECTION */}

     <section className="knowledge">
<h2 style={{ textAlign: 'center' }}>Nutrition Knowledge Center</h2>
<div className="knowledge-grid">

{/* COMMON FOOD */}

<div className="knowledge-card">

<h3 style={{ textAlign: 'center' }}>Calories In Common Foods</h3>


<table>

<thead>
<tr>
<th>Food</th>
<th>Calories</th>
</tr>
</thead>

<tbody>

<tr><td>1 Cup Rice</td><td>206</td></tr>
<tr><td>1 Egg</td><td>78</td></tr>
<tr><td>1 Banana</td><td>105</td></tr>
<tr><td>1 Apple</td><td>95</td></tr>
<tr><td>1 Cup Milk</td><td>122</td></tr>
<tr><td>1 Slice Bread</td><td>80</td></tr>
<tr><td>1 Tbsp Oil</td><td>120</td></tr>
<tr><td>1 Cup Pasta</td><td>221</td></tr>
<tr><td>100g Chicken</td><td>239</td></tr>
<tr><td>100g Fish</td><td>206</td></tr>
<tr><td>100g Paneer</td><td>265</td></tr>
<tr><td>1 Cup Dal</td><td>198</td></tr>
<tr><td>1 Potato</td><td>163</td></tr>
<tr><td>1 Cup Yogurt</td><td>149</td></tr>
<tr><td>1 Cup Oats</td><td>307</td></tr>
<tr><td>1 Avocado</td><td>240</td></tr>
<tr><td>1 Cup Broccoli</td><td>55</td></tr>
<tr><td>1 Cup Quinoa</td><td>222</td></tr>
<tr><td>1 Sweet Potato</td><td>103</td></tr>
<tr><td>1 Whole Egg Omelette</td><td>154</td></tr>
<tr><td>1 Chapati</td><td>104</td></tr>
<tr><td>1 Cup Chickpeas</td><td>269</td></tr>
<tr><td>1 Cup Lentils</td><td>230</td></tr>
<tr><td>1 Cup Corn</td><td>143</td></tr>

</tbody>

</table>

</div>

{/* SAMPLE MEAL PLANS */}

<div className="knowledge-card">

<h3 style={{ textAlign: 'center' }}>Sample Daily Meal Plans</h3>

<table>

<thead>
<tr>
<th>Calories</th>
<th>Breakfast</th>
<th>Lunch</th>
<th>Dinner</th>
</tr>
</thead>

<tbody>

<tr>
<td>1000</td>
<td>1 boiled egg + 1 apple</td>
<td>1 cup vegetable salad + grilled chicken</td>
<td>1 bowl vegetable soup</td>
</tr>

<tr>
<td>1200</td>
<td>Oatmeal + banana</td>
<td>Brown rice + dal + vegetables</td>
<td>Grilled fish + salad</td>
</tr>

<tr>
<td>1500</td>
<td>2 eggs + whole wheat toast</td>
<td>1 cup rice + chicken curry + vegetables</td>
<td>Paneer salad bowl</td>
</tr>

<tr>
<td>1800</td>
<td>Oats + milk + nuts</td>
<td>Rice + dal + grilled fish</td>
<td>Chicken salad wrap</td>
</tr>

<tr>
<td>2000</td>
<td>3 eggs + toast + milk</td>
<td>Rice + chicken curry + vegetables</td>
<td>Grilled fish + quinoa</td>
</tr>

<tr>
<td>2200</td>
<td>Oats + milk + almonds</td>
<td>Brown rice + dal + chicken</td>
<td>Paneer curry + chapati</td>
</tr>

<tr>
<td>2500</td>
<td>Egg omelette + toast + milk</td>
<td>Rice + fish curry + vegetables</td>
<td>Chicken pasta</td>
</tr>

<tr>
<td>2800</td>
<td>Oats + banana + peanut butter</td>
<td>Rice + chicken + dal</td>
<td>Steak / paneer bowl + quinoa</td>
</tr>

<tr>
<td>3000</td>
<td>4 eggs + oats + milk</td>
<td>Rice + chicken curry + vegetables</td>
<td>Grilled fish + pasta</td>
</tr>

<tr>
<td>3500</td>
<td>Omelette + oats + milk + banana</td>
<td>Rice + chicken + dal + vegetables</td>
<td>Chicken pasta + salad</td>
</tr>

</tbody>

</table>

</div>

{/* CALORIE BURNING */}

<div className="knowledge-card">

<h3 style={{ textAlign: 'center' }}>Calories Burned By Exercise</h3>

<table>

<thead>
<tr>
<th>Exercise</th>
<th>Calories / Hour</th>
</tr>
</thead>

<tbody>

<tr><td>Running</td><td>300</td></tr>
<tr><td>Jogging</td><td>250</td></tr>
<tr><td>Cycling</td><td>280</td></tr>
<tr><td>Swimming</td><td>400</td></tr>
<tr><td>Walking</td><td>200</td></tr>
<tr><td>Skipping Rope</td><td>450</td></tr>
<tr><td>HIIT</td><td>500</td></tr>
<tr><td>Strength Training</td><td>350</td></tr>
<tr><td>Basketball</td><td>370</td></tr>
<tr><td>Football</td><td>420</td></tr>
<tr><td>Tennis</td><td>330</td></tr>
<tr><td>Hiking</td><td>360</td></tr>
<tr><td>Rowing</td><td>380</td></tr>
<tr><td>Boxing</td><td>450</td></tr>
<tr><td>Climbing</td><td>420</td></tr>
<tr><td>Elliptical</td><td>320</td></tr>
<tr><td>Pushups</td><td>300</td></tr>
<tr><td>Stretching</td><td>120</td></tr>
<tr><td>Jumping Jacks</td><td>400</td></tr>
<tr><td>Burpees</td><td>500</td></tr>
<tr><td>Mountain Climbers</td><td>450</td></tr>
<tr><td>Squats</td><td>300</td></tr>
<tr><td>Lunges</td><td>280</td></tr>
<tr><td>Plank</td><td>200</td></tr>

</tbody>

</table>

</div>

</div>

</section>


      {/* FOOTER */}

      <footer className="footer">

        <p>© 2026 CalorieLens — AI Nutrition Platform</p>

      </footer>


    </div>
  );
}

export default LandingPage;