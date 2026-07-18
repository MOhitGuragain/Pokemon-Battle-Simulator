// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Battle from "../pages/Battle";
import Pokedex from "../pages/Pokedex";
import TeamBuilder from "../pages/TeamBuilder";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}