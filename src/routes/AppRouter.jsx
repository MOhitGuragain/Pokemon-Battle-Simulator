import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Battle from "../pages/Battle";
import Pokedex from "../pages/Pokedex";
import TeamBuilder from "../pages/TeamBuilder";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}