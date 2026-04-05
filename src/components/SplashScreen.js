import { useEffect } from "react";
import "../styles/splash.css";

function SplashScreen({ onFinish }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (

    <div className="splash-wrapper">

      <div className="splash-card">

        <h1 className="brand-title">CalorieLens</h1>

        <p className="brand-subtitle">
          Intelligent nutrition tracking for a healthier life
        </p>

        <div className="pulse-loader"></div>

      </div>

    </div>

  );
}

export default SplashScreen;