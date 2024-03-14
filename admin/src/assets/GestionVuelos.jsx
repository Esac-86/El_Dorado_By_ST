import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './componets/Box';
import MyBoton from './componets/MyBoton';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function GestionVuelos() {
  const navigate = useNavigate();
  const [vuelos, setVuelos] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [aerolineas, setAerolineas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/dorado/vuelos/consultar')
      .then(response => {
        const vuelosOrdenados = response.data.vuelos.sort((a, b) => {
          const horaSalidaA = new Date(`2023-01-01T${a.horasalida}`).getTime();
          const horaSalidaB = new Date(`2023-01-01T${b.horasalida}`).getTime();
          return horaSalidaA - horaSalidaB;
        });

        setVuelos(vuelosOrdenados || []);
      })
      .catch(error => {
        console.error('Error al obtener vuelos:', error);
      });

    axios.get('http://localhost:3000/dorado/destinos')
      .then(response => {
        setDestinos(response.data.destinos || []);
      })
      .catch(error => {
        console.error('Error al obtener destinos:', error);
      });

    axios.get('http://localhost:3000/dorado/aerolineas')
      .then(response => {
        setAerolineas(response.data.aerolineas || []);
      })
      .catch(error => {
        console.error('Error al obtener aerolíneas:', error);
      });
  }, []);

  const handleEditarClick = (codVuelo) => {
    // Redirigir al usuario a la ruta de edición con el código de vuelo
    navigate(`/editarvuelo/${codVuelo}`);
  };

  const handleVerPasajerosClick = async (codVuelo) => {
    try {
      // Hacer la llamada al backend para obtener la lista de pasajeros del vuelo específico
      const response = await axios.get(`http://localhost:3000/dorado/pasajeros/consultar/${codVuelo}`);
      const pasajeros = response.data.pasajeros || [];
  
      // Verificar si hay pasajeros
      if (pasajeros.length > 0) {
        // Si hay pasajeros, navegar a la página listapasajeros
        navigate(`/listapasajeros/${codVuelo}`);
      } else {
        // Si no hay pasajeros, mostrar un alert
        console.log('Este vuelo no tiene pasajeros.');
      }
    } catch (error) {
      console.error('Error al obtener pasajeros:', error);
      Swal.fire("Error", "Este vuelo no tiene ningún pasajero registrado.", "error");
    }
  };
  



  const getDestinoName = (codDestino) => {
    const destino = destinos.find(destino => destino.coddestino === codDestino);
    return destino ? destino.descripcion : 'No encontrado';
  };

  const getAerolineaName = (codAerolinea) => {
    const aerolinea = aerolineas.find(aerolinea => aerolinea.codaerolinea === codAerolinea);
    return aerolinea ? aerolinea.descripcion : 'No encontrada';
  };

  const calcularTiempoVuelo = (horaSalida, horaLlegada) => {
    const horaSalidaDate = new Date(`2023-01-01T${horaSalida}`);
    const horaLlegadaDate = new Date(`2023-01-01T${horaLlegada}`);

    // Calcula la diferencia en milisegundos
    const diferencia = horaLlegadaDate - horaSalidaDate;

    // Convierte la diferencia a horas y minutos
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas}h ${minutos}m`;
  };

  const formatHora = (hora) => {
    const date = new Date(`2023-01-01T${hora}`);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <Box>
      <div className='flex w-full justify-end bg-white rounded-xl px-5 py-3 shadow-lg'>
        <div className='flex gap-2 '>

          <MyBoton
            text={'Crear pasajero'}
            linkTo={'/CrearPasajero'}
            className={'flex bg-white px-2 py-1 rounded-xl shadow-lg text-black font-bold'}
            children={
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </>
            }
          />
          <MyBoton
            text={'Crear vuelo'}
            className={'flex bg-white px-2 py-1 rounded-xl shadow-lg text-black font-bold'}
            linkTo={'/CrearVuelo'}
            children={
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </>
            }
          />
          <MyBoton
            text={'Salir'}
            className={'flex bg-red-500 px-2 py-1 rounded-xl shadow-lg text-white hover:text-red-500 hover:bg-white font-bold'}
            linkTo={'/'}
            children={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            }
          />
        </div>
      </div>
      <br />
      <div className="m-auto">
        <table className="m-auto table-auto hover:table-fixed shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">COD VUELO</th>
              <th className="px-4 py-2">DESTINO</th>
              <th className="px-4 py-2">AEROLINEA</th>
              <th className="px-4 py-2">SALA</th>
              <th className="px-4 py-2">HORA SALIDA</th>
              <th className="px-4 py-2">HORA LLEGADA</th>
              <th className="px-4 py-2">TIEMPO DE VUELO</th>
              <th className="px-4 py-2">Editar</th>
              <th className="px-4 py-2">Ver pasajeros</th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map(vuelo => (
              <tr key={vuelo.codvuelo}>
                <td className="border border-2 border-gray-300 px-4 py-2">{vuelo.codvuelo}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{getDestinoName(vuelo.coddestino)}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{getAerolineaName(vuelo.codaerolinea)}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{vuelo.salaabordaje}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{formatHora(vuelo.horasalida)}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{formatHora(vuelo.horallegada)}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">{calcularTiempoVuelo(vuelo.horasalida, vuelo.horallegada)}</td>
                <td className="border border-2 border-gray-300 px-4 py-2">
                  <button
                    className="flex justify-between bg-white font-bold py-2 px-4 rounded-xl text-sky-500 shadow-lg"
                    onClick={() => handleEditarClick(vuelo.codvuelo)}
                  >
                    Editar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </td>
                <td className="border border-2 border-gray-300 px-4 py-2">
                  <button
                    className="flex justify-between bg-white text-white font-bold py-2 px-4 rounded-xl text-yellow-500 shadow-lg"
                    onClick={() => handleVerPasajerosClick(vuelo.codvuelo)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

export default GestionVuelos;
