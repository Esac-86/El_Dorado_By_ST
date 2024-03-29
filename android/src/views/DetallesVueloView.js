import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { detallesVueloStyles } from '../styles/DetallesVueloStyles';
import getData from '../functions/GetData';
import { getDestinoName, getAerolineaName, calcularTiempoVuelo, formatHora } from '../functions/FlightUtils';

import { BACKEND_URL } from '@env';

export default function DetallesVuelo({ route, navigation }) {
  const codvuelo = route.params ? route.params.codvuelo : null;
  const [vuelo, setVuelo] = useState(null);
  const [destinos, setDestinos] = useState([]);
  const [aerolineas, setAerolineas] = useState([]);

  useEffect(() => {
    if (codvuelo) {
      getData()
        .then(({ vuelos, destinos, aerolineas }) => {
          const vueloEspecifico = vuelos.find(vuelo => vuelo.codvuelo === codvuelo);
          setVuelo(vueloEspecifico);
          setDestinos(destinos);
          setAerolineas(aerolineas);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [codvuelo]);

  const handleVerPasajeros = () => {
    navigation.navigate('VerPasajeros', { codvuelo: codvuelo });
  };

  const handleEditarVuelo = () => {
    navigation.navigate('EditarVuelo', { codvuelo: vuelo.codvuelo });
  };

  const handleEliminarVuelo = () => {
    if (vuelo) {
      Alert.alert(
        'Confirmar Eliminación',
        '¿Estás seguro de que deseas eliminar este vuelo?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: () => confirmarEliminacion(),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const confirmarEliminacion = () => {
    axios.delete(`${BACKEND_URL}/vuelos/eliminar/${vuelo.codvuelo}`)
      .then(response => {
        if (response.status === 200) {
          Alert.alert('Vuelo Eliminado', 'El vuelo ha sido eliminado exitosamente.');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'Error al eliminar el vuelo.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el vuelo:', error);
        Alert.alert('Error', 'Error al eliminar el vuelo.');
      });
  };

  if (!codvuelo) {
    return <Text>Error: Código de vuelo no definido</Text>;
  }

  if (!vuelo || !destinos.length || !aerolineas.length) {
    return <Text></Text>;
  }

  return (
    <View style={detallesVueloStyles.container}>
      <View style={detallesVueloStyles.card}>
        <Text style={detallesVueloStyles.text}>Código de vuelo: {vuelo.codvuelo}</Text>
        <Text style={detallesVueloStyles.text}>Destino: {getDestinoName(vuelo.coddestino, destinos)}</Text>
        <Text style={detallesVueloStyles.text}>Aerolínea: {getAerolineaName(vuelo.codaerolinea, aerolineas)}</Text>
        <Text style={detallesVueloStyles.text}>Sala: {vuelo.salaabordaje}</Text>
        <Text style={detallesVueloStyles.text}>Hora de salida: {formatHora(vuelo.horasalida)}</Text>
        <Text style={detallesVueloStyles.text}>Hora de llegada: {formatHora(vuelo.horallegada)}</Text>
        <Text style={detallesVueloStyles.text}>Tiempo de vuelo: {calcularTiempoVuelo(vuelo.horasalida, vuelo.horallegada)}</Text>
      </View>
      <TouchableOpacity onPress={handleVerPasajeros} style={detallesVueloStyles.button}>
        <Text style={detallesVueloStyles.buttonText}>Ver Pasajeros</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEditarVuelo} style={detallesVueloStyles.button}>
        <Text style={detallesVueloStyles.buttonText}>Editar Vuelo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEliminarVuelo} style={detallesVueloStyles.button}>
        <Text style={detallesVueloStyles.buttonText}>Eliminar Vuelo</Text>
      </TouchableOpacity>
    </View>
  );
}
