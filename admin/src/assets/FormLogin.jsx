import React, { useState } from 'react';
import estilos from './formLogin.module.css';
import axios from 'axios';
import MyBoton from './componets/MyBoton';
import { useNavigate } from 'react-router-dom';
import MyModal from './componets/MyModal';
import MyImg from './componets/MyImg';
import Swal from "sweetalert2";


function FormLogin() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario

    try {
      const response = await axios.post('http://localhost:3000/dorado/login', { username, password });
      console.log(response.data.message);

      // Si el inicio de sesión es exitoso, redirige a la página de GestionVuelos
      navigate('/GestionVuelos');
    } catch (error) {
      Swal.fire("Error", "Credenciales inválidas.", "error");

      console.error('Error de inicio de sesión:', error.response?.data?.error || 'Error desconocido');
    }
  };

  return (
    <div className={`${estilos.contenedorLogin} `}>
      <div className="bg-gradient-to-r from-yellow-500 to-black py-20">
    <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Bienvenido al Aeropuerto Dorado</h1>
        <p className="text-lg text-white mb-8">El lugar donde el control y la organización de vuelos está en tus manos.</p>
        <MyBoton
            onClick={openModal}
            text={'Ingresar al panel'}
            className={'bg-white hover:text-black px-2 py-1 rounded-xl shadow-lg text-black font-bold'}
          />

    </div>
</div>

<div className="container mx-auto py-12">
    <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-1 md:mb-0">
      <img src="src/img/hero.jpg" alt="" />
        </div>
        <div className="md:w-1/2 px-2">
            <h2 className="text-3xl font-bold mb-4">Aeropuerto Dorado</h2>
            <p className="text-lg mb-6">El Aeropuerto Dorado es un centro de operaciones aéreas donde el control y la gestión de vuelos se realiza de manera eficiente y organizada.</p>
            <p className="text-lg mb-6">Nuestro sistema proporciona a los administradores las herramientas necesarias para controlar horarios, rutas, disponibilidad de pistas y más, facilitando la gestión de vuelos y mejorando la experiencia de los pasajeros.</p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">Más información</a>
        </div>
    </div>
</div>
      <MyModal
        show={showModal}
        onClick={closeModal}
        children={
          <>
            <div className="">
              <form className=" bg-white shadow-md rounded-xl px-3 pt-6" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-6 text-center">INICIAR SESIÓN</h2>
                <div className="mb-4">
                  <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="Usuario">
                    Usuario
                  </label>
                  <input
                    className="shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Usuario"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-6 w-full flex flex-col">
                  <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex items-center justify-center py-3">
                  <MyBoton
                    text={'INGRESAR'}
                    type="submit"
                    className={'w-9/12 bg-gray-200 hover:text-white hover:bg-yellow-500 text-yellow-500 font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline'}
                  />
                </div>
              </form>
            </div>

          </>
        }
      />
     
    </div>
  );
}

export default FormLogin;
