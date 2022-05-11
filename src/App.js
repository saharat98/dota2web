import "./App.css";
import Navbar from "./Navigation/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import React from "react";
import Favheroes from "./Pages/Favheroes";
import Herodetail from "./Pages/Herodetail";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="favoriteheroes" element={<Favheroes />} />
        <Route exact path="herodetail" element={<Herodetail />} />
      </Routes>
    </div>
  );
}

export default App;
