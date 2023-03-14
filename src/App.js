import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./components/ShowsList/List";
import Login from "./components/Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
