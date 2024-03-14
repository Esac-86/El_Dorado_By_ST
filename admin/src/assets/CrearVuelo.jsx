import React, { useState } from "react";
import axios from "axios";
import Box from "./componets/Box";
import BtnBack from "./componets/BtnBack";
import Swal from "sweetalert2";
import MyImg from "./componets/MyImg";

const CrearVuelo = () => {
  const [formData, setFormData] = useState({
    coddestino: "",
    codaerolinea: "",
    salaabordaje: "",
    horasalida: "",
    horallegada: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validar campos obligatorios
      if (
        !formData.coddestino ||
        !formData.codaerolinea ||
        !formData.salaabordaje ||
        !formData.horasalida ||
        !formData.horallegada
      ) {
        // Mostrar alerta de error si faltan campos
        return Swal.fire(
          "Error",
          "Todos los campos son obligatorios.",
          "error"
        );
      }

      // Envía la solicitud al backend
      const response = await axios.post(
        "http://localhost:3000/dorado/vuelos/crear",
        formData
      );

      // Muestra una alerta de éxito
      Swal.fire("Éxito", "Vuelo creado con éxito", "success");

      // Maneja la respuesta del servidor
      console.log(response.data.message); // Puedes mostrar un mensaje de éxito si lo deseas
    } catch (error) {
      console.error("Error al crear vuelo:", error.response.data.message);
      // Muestra una alerta de error
      Swal.fire(
        "Error",
        "Error al crear vuelo. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  return (
    <Box>
      <div className='flex w-full justify-between items-center text-violet-700 font-bold bg-white rounded-xl px-5 py-3 shadow-lg'>
        <h1>Crear vuelo</h1>
        <div className="flex gap-2 ">
          <BtnBack linkTo={"/GestionVuelos"} />
        </div>
      </div>
      <br />
      <div className="flex gap-1 justify-center relative">
        <MyImg
          src='src/img/myimg4.png'
          className1={'myimg'}
          className2={'h-96'}
        />
        <form className=" myForm w-full bg-white flex flex-col px-4 py-4 rounded-lg">
          <div className="w-full gap-4 grid-cols-3 grid-rows-2 ">
            <div className="">
              <label htmlFor="codaerolinea" className="block mb-2 font-bold">
                Aerolínea
              </label>
              <select
                name="codaerolinea"
                className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
              >
                <option selected="true" disabled="disabled">
                  Seleccionar...
                </option>
                <option value="1">Avianca</option>
                <option value="2">Satena</option>
                <option value="3">Wingo</option>
                <option value="4">Latam</option>
                <option value="5">Ultra Air</option>
                <option value="6">Easyfly</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="salaabordaje" className="block mb-2 font-bold">
                Sala de abordaje
              </label>
              <select
                name="salaabordaje"
                className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
              >
                <option selected="true" disabled="disabled">
                  Seleccionar...
                </option>
                <option value="A1">A1</option>
                <option value="B2">B2</option>
                <option value="C3">C3</option>
                <option value="D4">D4</option>
                <option value="E5">E5</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="coddestino" className="block mb-2 font-bold">
                Destinos
              </label>
              <select
                name="coddestino"
                className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
              >
                <option selected="true" disabled="disabled">
                  Seleccionar...
                </option>
                <option value="1">Armenia</option>
                <option value="2">Barranquilla</option>
                <option value="3">Cali</option>
                <option value="4">Cartagena</option>
                <option value="5">Medellin</option>
                <option value="6">Santa Marta</option>
                <option value="7">San Andres</option>
              </select>
            </div>
            <div className="flex gap-1 justify-center">
              <div className="">
                <label htmlFor="horasalida" className="block mb-2 font-bold">
                  Hora de salida
                </label>
                <input
                  type="time"
                  name="horasalida"
                  className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label htmlFor="horallegada" className="block mb-2 font-bold">
                  Hora de llegada
                </label>
                <input
                  type="time"
                  name="horallegada"
                  className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-start">
            <button
              className=" bg-gray-200 hover:text-white hover:bg-blue-700 text-blue-800 font-bold py-1 px-8 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              REGISTRAR
            </button>
          </div>
        </form>

      </div>

    </Box>
  );
};

export default CrearVuelo;
