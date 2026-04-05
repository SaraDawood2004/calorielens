import React, { useState } from "react";
import "../styles/navbar.css";
import { FiSun, FiMoon } from "react-icons/fi";
import { NavLink } from "react-router-dom";
function Navbar({ openAuth }) {

const [dropdownOpen,setDropdownOpen] = useState(false)
const [darkMode,setDarkMode] = useState(false)

const toggleDarkMode=()=>{
document.body.classList.toggle("dark")
setDarkMode(!darkMode)
}

return(

<nav className="navbar">

<div className="logo">
CalorieLens
</div>

<div className="nav-right">

{/* NAV LINKS ONLY AFTER LOGIN */}

<div className="nav-links">

<NavLink className="nav-item" to="/" end>
Home
</NavLink>

<div
className="dropdown"
onMouseEnter={()=>setDropdownOpen(true)}
onMouseLeave={()=>setDropdownOpen(false)}
>

<span className="nav-item">
Calculate ▾
</span>

{dropdownOpen && (

<div className="dropdown-menu">

<NavLink to="/food-calorie">
Food Calorie Calculator
</NavLink>

<NavLink to="/bmi">
BMI Calculator
</NavLink>

<NavLink to="/daily-calorie">
Daily Calories
</NavLink>

</div>

)}

</div>

<NavLink className="nav-item" to="/contact">
Contact
</NavLink>

</div>

<button
className="dark-toggle"
onClick={toggleDarkMode}
>
{darkMode ? <FiSun size={18}/> : <FiMoon size={18}/>}
</button>

</div>

</nav>

)

}

export default Navbar