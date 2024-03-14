import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from './componets/Box';
import MyBoton from './componets/MyBoton';
import axios from 'axios';
import Swal from 'sweetalert2';
import MyImg from './componets/MyImg';

function EditarVuelo() {
    const { codVuelo } = useParams();
    const [vuelo, setVuelo] = useState(null);
    const [aerolineas, setAerolineas] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [selectedAerolinea, setSelectedAerolinea] = useState('');
    const [selectedDestino, setSelectedDestino] = useState('');
    const [selectedSala, setSelectedSala] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [horaLlegada, setHoraLlegada] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:3000/dorado/vuelos/consultar/${codVuelo}`)
            .then(response => {
                setVuelo(response.data.vuelo);
                setSelectedAerolinea(response.data.vuelo.codaerolinea);
                setSelectedDestino(response.data.vuelo.coddestino);
                setSelectedSala(response.data.vuelo.salaabordaje);
                setHoraSalida(response.data.vuelo.horasalida);
                setHoraLlegada(response.data.vuelo.horallegada);
            })
            .catch(error => {
                console.error('Error al obtener información del vuelo:', error);
            });

        axios.get('http://localhost:3000/dorado/aerolineas')
            .then(response => {
                setAerolineas(response.data.aerolineas || []);
            })
            .catch(error => {
                console.error('Error al obtener aerolíneas:', error);
            });

        axios.get('http://localhost:3000/dorado/destinos')
            .then(response => {
                setDestinos(response.data.destinos || []);
            })
            .catch(error => {
                console.error('Error al obtener destinos:', error);
            });
    }, [codVuelo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones adicionales si es necesario
        if (!selectedAerolinea || !selectedDestino || !selectedSala || !horaSalida || !horaLlegada) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios.',
            });
            return;
        }

        try {
            // Enviar el formulario y manejar la respuesta
            const response = await axios.put(`http://localhost:3000/dorado/vuelos/editar/${codVuelo}`, {
                coddestino: selectedDestino,
                codaerolinea: selectedAerolinea,
                salaabordaje: selectedSala,
                horasalida: horaSalida,
                horallegada: horaLlegada,
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: response.data.message,
            });
        } catch (error) {
            console.error('Error al editar vuelo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al editar el vuelo. Por favor, inténtalo de nuevo.',
            });
        }
    };

    const destinosMap = {
        1: 'Armenia',
        2: 'Barranquilla',
        3: 'Cali',
        4: 'Cartagena',
        5: 'Barranquilla',
        6: 'Medellin',
        7: 'San Andres',
    };

    const aerolineasMap = {
        1: 'Avianca',
        2: 'Satena',
        3: 'Wingo',
        4: 'Latam',
        5: 'Ultra Air',
        6: 'Easyfly',
    };

    if (!vuelo) {
        return (
            <div className='w-full h-96 flex justify-center items-center flex-col'>
                <div className="custom-loader"></div>
                <h1 className='text-yellow-500'>Cargando...</h1>
            </div>

        )

    }

    return (
        <Box>
            <div className='flex w-full justify-between items-center text-violet-700 font-bold bg-white rounded-xl px-5 py-3 shadow-lg'>
                <h1>Editar vuelo</h1>
                <div className='flex items-center gap-2 '>

                    <MyBoton
                        text={'Volver'}
                        linkTo={'/gestionvuelos'}
                        className={'flex bg-white px-2 py-1 rounded-xl shadow-lg text-black font-bold'}
                        children={
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </>
                        }
                    />
                </div>
            </div>
            <br />
            <div className='flex gap-1 justify-center relative'>
                <MyImg
                    src='src/img/myimg5.png'
                    className1={'myimg flex justify-center'}
                    className2={'h-96'}
                />
                <form className="myForm bg-white rounded-lg flex flex-col px-4 py-4" onSubmit={handleSubmit}>
                    <div className='w-full gap-4 grid-cols-3 grid-rows-2'>
                        <div className="">
                            <label htmlFor="codVuelo" className="block mb-2 font-bold">
                                Código de vuelo:
                            </label>
                            <div className="shadow bg-white py-2 px-3 border rounded-lg">{vuelo.codvuelo}</div>
                        </div>
                        <div className="">
                            <label htmlFor="destino" className="block mb-2 font-bold">
                                Destino:
                            </label>
                            <div className="shadow bg-white py-2 px-3 border rounded-lg">{destinosMap[vuelo.coddestino]}</div>
                        </div>
                        <div className="">
                            <label htmlFor="aerolinea" className="block mb-2 font-bold">
                                Aerolínea:
                            </label>
                            <div className="shadow bg-white py-2 px-3 border rounded-lg">{aerolineasMap[vuelo.codaerolinea]}</div>
                        </div>
                        <div className="">
                            <label htmlFor="salaabordaje" className="block mb-2 font-bold">
                                Sala de abordaje:
                            </label>
                            <div className="shadow bg-white py-2 px-3 border rounded-lg">{vuelo.salaabordaje}</div>

                        </div>
                        <div className="">
                            <label htmlFor="horaSalida" className="block mb-2 font-bold">
                                Hora de salida:
                            </label>
                            <input
                                type='time'
                                className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={horaSalida}
                                onChange={(e) => setHoraSalida(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="horaLlegada" className="block mb-2 font-bold">
                                Hora de llegada:
                            </label>
                            <input
                                type='time'
                                className="shadow appearance-none border rounded-lg w-full m-auto py-2 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={horaLlegada}
                                onChange={(e) => setHoraLlegada(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-start py-3">
                        <MyBoton
                            text={'EDITAR'}
                            type="submit"
                            className={'bg-gray-200 hover:text-white hover:bg-blue-700 text-blue-800 font-bold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline'}
                        />
                    </div>
                </form>

            </div>

        </Box>
    );
}

export default EditarVuelo;
