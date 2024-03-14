import React, { useState, useEffect } from 'react';
import Box from './componets/Box';
import BtnBack from './componets/BtnBack';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const destinosMap = {
    1: 'Armenia',
    2: 'Barranquilla',
    3: 'Cali',
    4: 'Cartagena',
    5: 'Barranquilla',
    6: 'Medellin',
    7: 'San Andres',
};

function ListaPasajeros() {
    const { codVuelo } = useParams();
    const [pasajeros, setPasajeros] = useState([]);
    const [vuelo, setVuelo] = useState(null);

    useEffect(() => {
        // Hacer la llamada al backend para obtener la lista de pasajeros del vuelo específico
        axios.get(`http://localhost:3000/dorado/pasajeros/consultar/${codVuelo}`)
            .then(response => {
                console.log('Datos del pasajero:', response.data);
                setPasajeros(response.data.pasajeros || []);
            })
            .catch(error => {
                console.error('Error al obtener pasajeros:', error);
            });

        // Hacer la llamada al backend para obtener la información del vuelo
        axios.get(`http://localhost:3000/dorado/vuelos/consultar/${codVuelo}`)
            .then(response => {
                console.log('Datos del vuelo:', response.data);
                setVuelo(response.data.vuelo || null);
            })
            .catch(error => {
                console.error('Error al obtener información del vuelo:', error);
            });
    }, [codVuelo]);

    const handleEliminarClick = async (id) => {
        try {
            // Hacer la llamada al backend para eliminar el pasajero
            await axios.delete(`http://localhost:3000/dorado/pasajeros/eliminar/${id}`);
            // Actualizar la lista de pasajeros después de la eliminación
            setPasajeros(prevPasajeros => prevPasajeros.filter(pasajero => pasajero.id !== id));
        } catch (error) {
            console.error('Error al eliminar pasajero:', error);
        }
    };

    return (
        <Box>
            <div className='flex w-full justify-between items-center text-violet-700 font-bold bg-white rounded-xl px-5 py-3 shadow-lg'>
                <h1>Lista de pasajeros - Vuelo {codVuelo} - {vuelo ? `Destino: ${destinosMap[vuelo.coddestino]}` : ''}</h1>
                <div className='flex gap-2 '>
                    <BtnBack linkTo={'/GestionVuelos'} />
                </div>
            </div>
            <br />
            <div className="m-auto">
                <table className="m-auto table-auto hover:table-fixed shadow-lg rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">IDENTIFICACION</th>
                            <th className="px-4 py-2">NOMBRES</th>
                            <th className="px-4 py-2">APELLIDOS</th>
                            <th className="px-4 py-2">EMAIL</th>
                            <th className="px-4 py-2">TELEFONO</th>
                            <th className="px-4 py-2">ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody className='rounded-lg'>
                        {pasajeros.map(pasajero => (
                            <tr key={pasajero.id}>
                                <td className="border border-2 border-gray-300 px-4 py-2">{pasajero.id}</td>
                                <td className="border border-2 border-gray-300 px-4 py-2">{pasajero.nombres}</td>
                                <td className="border border-2 border-gray-300 px-4 py-2">{pasajero.apellidos}</td>
                                <td className="border border-2 border-gray-300 px-4 py-2">{pasajero.email}</td>
                                <td className="border border-2 border-gray-300 px-4 py-2">{pasajero.telefono}</td>
                                <td className="border border-2 border-gray-300 px-4 py-2">
                                    <button
                                        className="flex justify-between bg-white font-bold py-2 px-4 rounded-xl text-red-500 shadow-lg"
                                        onClick={() => handleEliminarClick(pasajero.id)}
                                    >
                                        Eliminar
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

export default ListaPasajeros;
