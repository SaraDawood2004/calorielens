import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/bmi.css";

function BMICalculator() {

  const [height,setHeight] = useState("")
  const [weight,setWeight] = useState("")
  const [bmi,setBmi] = useState(null)
  const [status,setStatus] = useState("")
  const [animateTheme,setAnimateTheme] = useState("")

  //  PARTICLE PARALLAX (same system)
  useEffect(() => {
    const handleMove = (e) => {
      const particles = document.querySelectorAll(".particle");

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      particles.forEach((p, i) => {
        const speed = (i + 1) * 2;
        p.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const calculateBMI = () => {

    if(!height || !weight) return

    const h = height / 100
    const bmiValue = (weight / (h*h)).toFixed(2)

    setBmi(bmiValue)

    let category=""

    if(bmiValue < 18.5){
      category="underweight"
    }
    else if(bmiValue < 24.9){
      category="normal"
    }
    else if(bmiValue < 29.9){
      category="overweight"
    }
    else{
      category="obese"
    }

    setStatus(category)

    setAnimateTheme(category)

    setTimeout(()=>{
      setAnimateTheme("")
    },3000)
  }

  return(

  <div className={`bmi-page ${animateTheme}`}>

    <Navbar/>

    {/* FLOATING PARTICLES */}
    <div className="food-particles">
      <img className="particle p1" src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"/>
      <img className="particle p2" src="https://cdn-icons-png.flaticon.com/512/135/135620.png"/>
      <img className="particle p3" src="https://cdn-icons-png.flaticon.com/512/2922/2922037.png"/>
      <img className="particle p4" src="https://cdn-icons-png.flaticon.com/512/590/590685.png"/>
      <img className="particle p5" src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"/>
      <img className="particle p6" src="https://cdn-icons-png.flaticon.com/512/685/685352.png"/>
      <img className="particle p7" src="https://cdn-icons-png.flaticon.com/512/1046/1046751.png"/>
      <img className="particle p8" src="https://cdn-icons-png.flaticon.com/512/1046/1046769.png"/>
    </div>

    <div className="bmi-layout">

      {/* LEFT PANEL */}
      <div className="bmi-info-panel">

        <h1>What is BMI?</h1>

        <p className="bmi-desc">
          Body Mass Index (BMI) is a simple way to estimate
          whether your body weight is healthy for your height.
          Think of it as a quick <b>health indicator</b>.
        </p>

        <div className="bmi-categories">

          <div className="bmi-box under">
            <h3>Underweight</h3>
            <p>BMI less than 18.5</p>
          </div>

          <div className="bmi-box normal">
            <h3>Normal</h3>
            <p>BMI 18.5 – 24.9</p>
          </div>

          <div className="bmi-box over">
            <h3>Overweight</h3>
            <p>BMI 25 – 29.9</p>
          </div>

          <div className="bmi-box obese">
            <h3>Obese</h3>
            <p>BMI 30+</p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="bmi-calculator">

        <h2>Calculate Your BMI</h2>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e)=>setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
        />

        <button onClick={calculateBMI}>
          Calculate BMI
        </button>

        {bmi && (

          <div className="bmi-result">

            <h3>Your BMI</h3>

            <h1 className="bmi-value">
              {bmi}
            </h1>

            <p className={`bmi-status ${status}`}>
              {status.toUpperCase()}
            </p>

          </div>

        )}

      </div>

    </div>

    <footer className="footer">
      <p>© 2026 CalorieLens — AI Nutrition Platform</p>
    </footer>

  </div>
  )
}

export default BMICalculator