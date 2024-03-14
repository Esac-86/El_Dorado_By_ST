import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { dashboardStyles as styles } from '../styles/DashboardStyles';
import getData from '../functions/GetData';
import { getDestinoName, getAerolineaName, calcularTiempoVuelo, formatHora } from '../functions/FlightUtils';

export default function Dashboard() {
  const navigation = useNavigation();
  const [vuelos, setVuelos] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [aerolineas, setAerolineas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Utiliza useFocusEffect para actualizar los datos cada vez que la pantalla se enfoca
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    setRefreshing(true);
    getData()
      .then(({ vuelos, destinos, aerolineas }) => {
        setVuelos(vuelos);
        setDestinos(destinos);
        setAerolineas(aerolineas);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      })
      .finally(() => setRefreshing(false));
  };

  const handleVueloClick = (vuelo) => {
    navigation.navigate('DetallesVuelo', { codvuelo: vuelo.codvuelo });
  };

  const handleCrearVuelo = () => {
    navigation.navigate('CrearVuelo');
  };

  const handleCrearPasajero = () => {
    navigation.navigate('CrearPasajero', { vuelos: vuelos });
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadData}
            colors={['#6B46C1']}
            tintColor={'#6B46C1'}
          />
        }
      >
        {vuelos.map((vuelo, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleVueloClick(vuelo)}>
            <Text style={styles.text}>Código de vuelo: {vuelo.codvuelo}</Text>
            <Text style={styles.text}>Destino: {getDestinoName(vuelo.coddestino, destinos)}</Text>
            <Text style={styles.text}>Aerolínea: {getAerolineaName(vuelo.codaerolinea, aerolineas)}</Text>
            <Text style={styles.text}>Sala: {vuelo.salaabordaje}</Text>
            <Text style={styles.text}>Hora de salida: {formatHora(vuelo.horasalida)}</Text>
            <Text style={styles.text}>Hora de llegada: {formatHora(vuelo.horallegada)}</Text>
            <Text style={styles.text}>Tiempo de vuelo: {calcularTiempoVuelo(vuelo.horasalida, vuelo.horallegada)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity onPress={handleCrearVuelo} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Crear Vuelo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCrearPasajero} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Crear Pasajero</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
