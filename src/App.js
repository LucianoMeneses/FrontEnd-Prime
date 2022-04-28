
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu'
import PaginaInicial from './pages/PaginaInicial';
import DataTableUsuario from './pages/Usuario';
import DataTableCliente from './pages/Cliente';
import Pagina404 from './pages/Pagina404'

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" exact element={<PaginaInicial />} />
          <Route path="/clientes" element={<DataTableCliente />} />
          <Route path="/usuarios" element={<DataTableUsuario />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
