import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cadastro from "./paginas/cadastro";
import Carros from "./paginas/carros";
import Login from "./paginas/login";
import  Estoque from "./paginas/estoque"

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/carros">Carros</Link>
        <Link to= "/estoque">Estoque</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carros" element={<Carros />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
}

export default App;
