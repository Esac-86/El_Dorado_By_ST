import axios from 'axios';
import { BACKEND_URL } from '@env'

const getData = async () => {
  try {
    const [vuelosResponse, destinosResponse, aerolineasResponse] = await Promise.all([
      axios.get(`${BACKEND_URL}/vuelos/consultar`),
      axios.get(`${BACKEND_URL}/destinos`),
      axios.get(`${BACKEND_URL}/aerolineas`)
    ]);

    const vuelos = vuelosResponse.data.vuelos || [];
    const destinos = destinosResponse.data.destinos || [];
    const aerolineas = aerolineasResponse.data.aerolineas || [];

    return { vuelos, destinos, aerolineas };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export default getData;
