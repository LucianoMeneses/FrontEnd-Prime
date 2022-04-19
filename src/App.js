//Importar as dependências
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Importar as páginas
import Menu from './pages/Menu';
import PaginaInicial from './components/PaginaInicial/';
import CadastroUsuario from './components/Usuario';
import DataTableUsuario from './components/Cliente';
import Pagina404 from './pages/Pagina404'


//Criar o componentes com as rotas
function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" exact element={<PaginaInicial />} />
          <Route path="/usuario" element={<CadastroUsuario />} />
          <Route path="/cliente" element={<DataTableUsuario />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
