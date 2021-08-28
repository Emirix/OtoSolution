import React, { useState } from "react";
import "./Spinnerr.css";

export default function Spinner({
  color = "#222",
  speed = 0.8,
  double = 0,
  width = 4,
  size = 60,
}) {
  const [css, setCss] = useState({
    width: size,
    height: size,
    backgroundColor: "transparent",
    borderRadius: 300,
    borderWidth: width,
    borderStyle: "solid",
    animation: `turn ${speed}s infinite linear`,
  });

  return (
    <div
      className="emirix-spinner"
      style={{
        ...css,
        borderColor: color,
        borderTopColor: "transparent",
        borderBottomColor: double ? "transparent" : color,
      }}
    ></div>
  );
}
