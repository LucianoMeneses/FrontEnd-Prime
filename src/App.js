//Importar as dependências
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Importar as páginas
import Menu from './pages/Menu';
import PaginaInicial from './components/PaginaInicial/';
import DataTableUsuario from './components/Usuario';
import DataTableCliente from './components/Cliente';
import Teste from './components/Teste';
import Pagina404 from './pages/Pagina404'


//Criar o componentes com as rotas
function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" exact element={<PaginaInicial />} />
          <Route path="/clientes" element={<DataTableCliente />} />
          <Route path="/usuarios" element={<DataTableUsuario />} />
          <Route path="/testes" element={<Teste />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
