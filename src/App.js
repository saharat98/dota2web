import "./App.css";
import Navbar from "./Navigation/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import React from "react";
import Favheroes from "./Pages/Favheroes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="favoriteheroes" element={<Favheroes />} />
      </Routes>
    </div>
  );
}

export default App;
