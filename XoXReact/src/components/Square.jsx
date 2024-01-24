import React from "react";

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    <span style={{ color: value === "X" ? "#61dafb" : "#000" }}>{value}</span>
  </button>
);

export default Square;
