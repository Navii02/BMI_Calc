import React, { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [strokeDasharray, setStrokeDasharray] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#000"); // Default stroke color

  const calculateBMI = () => {
    if (!weight || !height) {
      alert("Please enter valid weight and height.");
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(calculatedBmi);

    // Determine BMI category and stroke color
    if (calculatedBmi < 18.5) {
      setCategory("Underweight");
      setStrokeColor("#FFCC03");
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setCategory("Normal weight");
      setStrokeColor("green");
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setCategory("Overweight");
      setStrokeColor("orange");
    } else {
      setCategory("Please Consult Doctor");
      setStrokeColor("red");
    }

    // Calculate percentage and update strokeDasharray
    const percentage = Math.min((calculatedBmi / 40) * 100, 100);
    setStrokeDasharray((percentage / 100) * 339.292); // Scale based on circumference
  };

  const resetFields = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
    setStrokeDasharray(0); // Reset the chart
    setStrokeColor("#000"); // Reset stroke color
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-secondary"
      style={{
        width: "100%",
        height: "100vh",
        // background: "linear-gradient(to right, #1D80DD, #61C2E3)",
      }}
    >
      <div className="bg-light p-5 rounded-2" style={{ width: "700px" }}>
        <h1 className="text-center">BMI Calculator</h1>
        <p className="text-center text-secondary">Calculate Your Body Mass Index</p>

        <div
          className="bg-info p-3 d-flex justify-content-center align-items-center mt-3 rounded-2 flex-column"
          style={{ height: "300px" }}
        >
          <div className="bmi-container">
          <svg className="circular-chart" viewBox="0 0 120 120">
  <circle className="circle-bg" cx="60" cy="60" r="54" />
  <circle
    className="circle"
    cx="60"
    cy="60"
    r="54"
    stroke={strokeColor} // Dynamic stroke color
    strokeDasharray={`${strokeDasharray}, 339.292`}
  />
  {/* BMI Value */}
  <text
    className="percentage"
    x="60"
    y="60"
    
    textAnchor="middle"
    dominantBaseline="middle"
     transform="rotate(90 60 60)"
  >
   BMI Graph
  </text>
</svg>

          </div>
          {bmi && (
            <>
              <h3 className="text-dark mt-3">Your BMI: {bmi}</h3>
              <h5 className="text-secondary">{category}</h5>
            </>
          )}
        </div>

        <div>
          <div className="my-3">
            <TextField
              id="weight"
              className="w-100 no-spinner"
              value={weight}
              name="weight"
              label="Weight (kg)"
               type="number"
              variant="outlined"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="my-3">
            <TextField
              id="height"
              className="w-100 no-spinner"
              value={height}
              name="height"
              label="Height (cm)"
               type="number"
              variant="outlined"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="contained"
              color="primary"
              className="w-45"
              onClick={calculateBMI}
            >
              Calculate
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="w-45"
              onClick={resetFields}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
