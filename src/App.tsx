import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Character from "./pages/Character";
import NoFound from './pages/NoFound'

function App() {
  return (
    <div className="p-4 container mx-auto text-gray-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>
  );
}

export default App;
