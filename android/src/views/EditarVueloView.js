import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import clockIcon from '../img/clock.png';
import { editarVueloStyles as styles } from '../styles/EditarVueloStyles';
import { BACKEND_URL } from '@env';

// Mapeado de destinos y aerolíneas
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

// Función para formatear la hora en formato AM/PM
const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // En caso de que sean las 0:00, lo convertimos a 12 AM
  minutes = minutes < 10 ? '0' + minutes : minutes; // Añadimos un 0 al principio si los minutos son menores que 10
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

// Función para formatear la hora en formato de 24 horas
const formatTime24 = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const EditarVuelo = ({ route }) => {
  const navigation = useNavigation();
  const { codvuelo } = route.params;

  const [formData, setFormData] = useState({
    coddestino: "",
    codaerolinea: "",
    salaabordaje: "",
    horasalida: null,
    horallegada: null,
  });
  const [loading, setLoading] = useState(false);
  const [showTimePickerSalida, setShowTimePickerSalida] = useState(false);
  const [showTimePickerLlegada, setShowTimePickerLlegada] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/vuelos/consultar/${codvuelo}`);
        const vuelo = response.data.vuelo;

        const parseTime = (timeStr) => {
          const [hours, minutes, seconds] = timeStr.split(':');
          return new Date(0, 0, 0, hours, minutes, seconds);
        };

        setFormData({
          coddestino: destinosMap[vuelo.coddestino],
          codaerolinea: aerolineasMap[vuelo.codaerolinea],
          salaabordaje: vuelo.salaabordaje,
          horasalida: parseTime(vuelo.horasalida),
          horallegada: parseTime(vuelo.horallegada),
        });
      } catch (error) {
        console.error("Error al obtener detalles del vuelo:", error.response.data.message);
        Alert.alert("Error", "Error al obtener detalles del vuelo. Por favor, inténtalo de nuevo.");
      }
    };


    fetchData();
  }, [codvuelo]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Formatear las horas antes de enviarlas al backend
      const formattedData = {
        horasalida: formatTime24(formData.horasalida), // Formatear hora de salida en formato de 24 horas
        horallegada: formatTime24(formData.horallegada), // Formatear hora de llegada en formato de 24 horas
      };
      const response = await axios.put(`${BACKEND_URL}/vuelos/editar/${codvuelo}`, formattedData);

      Alert.alert("Éxito", "Vuelo editado con éxito");
      navigation.navigate('Dashboard'); // Redirigir al dashboard después de editar el vuelo
      console.log(response.data.message);
    } catch (error) {
      console.error("Error al editar vuelo:", error.response.data.message);
      Alert.alert("Error", "Error al editar vuelo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Código de vuelo:</Text>
        <Text style={styles.value}>{codvuelo}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Aerolínea:</Text>
        <Text style={styles.value}>{formData.codaerolinea}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.value}>{formData.coddestino}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Sala de abordaje:</Text>
        <Text style={styles.value}>{formData.salaabordaje}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setShowTimePickerSalida(true)}
        style={styles.timeContainer}
      >
        <Text style={styles.timeText}>Hora de salida ({formData.horasalida ? formatAMPM(formData.horasalida) : '--:--'})</Text>
        <Image source={clockIcon} style={styles.clockIcon} />
      </TouchableOpacity>
      {showTimePickerSalida && (
        <DateTimePicker
          value={formData.horasalida}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={(event, selectedTime) => {
            setShowTimePickerSalida(false);
            if (selectedTime) {
              const adjustedTime = new Date(selectedTime.getTime() + 4 * 60000); // 4 minutos en milisegundos
              setFormData(prevData => ({ ...prevData, horasalida: adjustedTime }));
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => setShowTimePickerLlegada(true)}
        style={styles.timeContainer}
      >
        <Text style={styles.timeText}>Hora de llegada ({formData.horallegada ? formatAMPM(formData.horallegada) : '--:--'})</Text>
        <Image source={clockIcon} style={styles.clockIcon} />
      </TouchableOpacity>
      {showTimePickerLlegada && (
        <DateTimePicker
          value={formData.horallegada}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={(event, selectedTime) => {
            setShowTimePickerLlegada(false);
            if (selectedTime) {
              const adjustedTime = new Date(selectedTime.getTime() + 4 * 60000); // 4 minutos en milisegundos
              setFormData(prevData => ({ ...prevData, horallegada: adjustedTime }));
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>EDITAR VUELO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditarVuelo;
