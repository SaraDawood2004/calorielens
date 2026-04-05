import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/calorie.css";

function CalorieCalculator() {
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const [nutrients, setNutrients] = useState({
    carbs: 0,
    protein: 0,
    fat: 0
  });

  const [hoveredNutrient, setHoveredNutrient] = useState(null);

  const backendUrl = "http://127.0.0.1:5000";

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newItems = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      quantity: 1
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const handleQuantityChange = (index, quantity) => {
    const updated = [...items];
    updated[index].quantity = quantity;
    setItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const generateNutrientGradient = () => {
    const total = nutrients.carbs + nutrients.protein + nutrients.fat;
    if (total === 0) return "";

    const c = (nutrients.carbs / total) * 100;
    const p = (nutrients.protein / total) * 100;

    return `#bbf7d0 0% ${c}%, #4ade80 ${c}% ${c + p}%, #166534 ${c + p}% 100%`;
  };

  const calculateCalories = async () => {
    if (items.length === 0) return;

    const itemsWithFood = [];

    for (const item of items) {
      const formData = new FormData();
      formData.append("image", item.file);

      const predictRes = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        body: formData
      });

      const predictData = await predictRes.json();

      itemsWithFood.push({
        food: predictData.food,
        quantity: item.quantity
      });
    }

    const res = await fetch(`${backendUrl}/calculate-multiple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsWithFood })
    });

    const data = await res.json();

    const aggregated = {};
    data.items.forEach((item) => {
      if (!aggregated[item.food]) {
        aggregated[item.food] = {
          food: item.food,
          quantity: 0,
          calories: 0
        };
      }
      aggregated[item.food].quantity += item.quantity;
      aggregated[item.food].calories += item.calories;
    });

    setResults(Object.values(aggregated));
    setTotalCalories(data.total_calories);
    setNutrients(data.total_nutrients || {
    carbs: 0,
    protein: 0,
    fat: 0
    });  
};

  return (
    <div className="contact-container">
      <Navbar />
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
      <main className="main-content">
        <div className="dashboard-layout">

          {/* LEFT */}
          <div className="left-panel">
            <h2>Calorie Intelligence</h2>
            <p className="subheading">
              AI decoding your plate — one bite at a time
            </p>

            <input type="file" multiple onChange={handleFileChange} className="upload-btn" />

            <div className="items-grid">
              {items.map((item, index) => (
                <div key={index} className="item-card">
                  <img src={item.previewUrl} alt="food" />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                  <button onClick={() => handleRemove(index)} className="remove-btn">×</button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <button onClick={calculateCalories} className="calc-btn">
                Analyze
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            {totalCalories > 0 ? (
              <div className="center-result">
                  <h3>Calories Consumed</h3>
                {/* TOTAL */}
                <h1 className="calorie-animate">{totalCalories}</h1>
                {/* FOOD LIST */}
                <div className="legend">
                  {results.map((item, i) => (
                    <div key={i} className="legend-item">
                      <strong>{item.food}</strong> — {item.calories} kcal
                    </div>
                  ))}
                </div>
                <br></br>
                <hr></hr>
                  <h3>Nutrients Consumed</h3>

                {/* DONUT */}
                <div
                  className="main-ring"
                  style={{ background: `conic-gradient(${generateNutrientGradient()})` }}
                >
                  <div className="inner-ring">

                    {!hoveredNutrient && (
                      <div className="ring-center">
                    
                        <strong>
                          {nutrients.carbs + nutrients.protein + nutrients.fat} 
                        </strong>
                      </div>
                    )}

                    {hoveredNutrient && (
                      <div className="ring-center">
                        <p>{hoveredNutrient}</p>

                        {results.map((item, i) => {
                          const value = Math.round(
                            (item.calories / totalCalories) *
                              nutrients[hoveredNutrient] || 0
                          );

                          return (
                            <div key={i} className="mini-dist">
                              {item.food}: {value}
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                </div>

                {/* HOVER TRIGGERS */}
                <div className="legend">
                  {["carbs", "protein", "fat"].map((n) => (
                    <div
                      key={n}
                      className="legend-item"
                      onMouseEnter={() => setHoveredNutrient(n)}
                      onMouseLeave={() => setHoveredNutrient(null)}
                    >
                      {n} — {nutrients[n]}
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="empty-state">
                <h3 className="empty-title">Upload food to analyze</h3>
                <p className="empty-sub">
                  Your nutrition intelligence will unfold here
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="footer">© 2026 CalorieLens</footer>
    </div>
  );
}

export default CalorieCalculator;