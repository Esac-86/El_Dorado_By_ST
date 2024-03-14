import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FormLogin from './assets/FormLogin';
import NavAdmin from './assets/NavAdmin';
import GestionVuelos from './assets/GestionVuelos';
import ListaPasajeros from './assets/ListaPasajeros';
import CrearPasajero from './assets/CrearPasajero';
import CrearVuelo from './assets/CrearVuelo';
import EditarVuelo from './assets/EditarVuelo';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <NavAdmin />
        <Routes>
          <Route path="/GestionVuelos" element={<GestionVuelos />} />
          <Route path="/listapasajeros/:codVuelo" element={<ListaPasajeros />} />
          <Route path="/CrearPasajero" element={<CrearPasajero />} />
          <Route path="/CrearVuelo" element={<CrearVuelo />} />
          <Route path='/editarvuelo/:codVuelo' element={<EditarVuelo />} />
          <Route path="/" element={<FormLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
