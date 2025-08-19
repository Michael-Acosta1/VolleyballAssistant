import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalWrapper from "./components/GlobalWrapper";
import Home from "./Home";
import Login from "./components/login/Login";
import TeamRoster from "./TeamRoster";
import RegisterForm from "./components/login/RegisterForm";
import TeamGames from "./components/teamGames/TeamGames";

function App() {
  return (
    <GlobalWrapper>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TeamRoster" element={<TeamRoster />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/TeamGames" element={<TeamGames />} />
      </Routes>
    </GlobalWrapper>
  );
}

export default App;
