import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Students from "./components/Students";
import Doctors from "./components/Doctors";
const App = () => {
  return (
    <section className="bg-gray-900  ">
      <div className="min-h-screen container mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
};

export default App;
