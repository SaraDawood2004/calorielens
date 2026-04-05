import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";

import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";


import FoodCaloriePage from "./pages/FoodCaloriePage";
import BMICalculatorPage from "./pages/BMICalculatorPage";
import DailyCaloriePage from "./pages/DailyCaloriePage";

function App() {

const [loading,setLoading] = useState(true)

return(
<Router>

{loading ? (

<SplashScreen onFinish={()=>setLoading(false)} />

) : (

<Routes>

<Route path="/" element={ <LandingPage/> } />

<Route path="/contact" element={<ContactPage/>}/>

<Route path="/food-calorie" element={<FoodCaloriePage/>}/>

<Route path="/bmi" element={<BMICalculatorPage/>}/>

<Route path="/daily-calorie" element={<DailyCaloriePage/>}/>

</Routes>
)}

</Router>

)}

export default App;