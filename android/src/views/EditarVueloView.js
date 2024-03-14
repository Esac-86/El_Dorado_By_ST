import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import clockIcon from '../img/clock.png';
import { editarVueloStyles as styles } from '../styles/EditarVueloStyles';
import { BACKEND_URL } from '@env';

const EditarVuelo = ({ route }) => {
  const navigation = useNavigation();
  const { codVuelo } = route.params;

  const [formData, setFormData] = useState({
    coddestino: "",
    codaerolinea: "",
    salaabordaje: "",
    horasalida: new Date(),
    horallegada: new Date(),
  });
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [showTimePickerSalida, setShowTimePickerSalida] = useState(false);
  const [showTimePickerLlegada, setShowTimePickerLlegada] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/vuelos/consultar/${codvuelo}`);
        const vuelo = response.data.vuelo;
        setFormData({
          coddestino: vuelo.coddestino,
          codaerolinea: vuelo.codaerolinea,
          salaabordaje: vuelo.salaabordaje,
          horasalida: new Date(vuelo.horasalida),
          horallegada: new Date(vuelo.horallegada),
        });
      } catch (error) {
        console.error("Error al obtener detalles del vuelo:", error.response.data.message);
        Alert.alert("Error", "Error al obtener detalles del vuelo. Por favor, inténtalo de nuevo.");
      }
    };

    fetchData();
  }, [codVuelo]);

  const handleSubmit = async () => {
    try {
      setLoading(true); // Establecer el estado de carga a verdadero

      const formattedData = {
        horasalida: formData.horasalida.toLocaleTimeString('en-US', { hour12: false }),
        horallegada: formData.horallegada.toLocaleTimeString('en-US', { hour12: false }),
      };
      const response = await axios.put(`${BACKEND_URL}/vuelos/editar/${codVuelo}`, formattedData);

      Alert.alert("Éxito", "Vuelo editado con éxito");
      navigation.goBack();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error al editar vuelo:", error.response.data.message);
      Alert.alert("Error", "Error al editar vuelo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false); // Restablecer el estado de carga a falso
    }
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.timeText}>Hora de salida ({formData.horasalida.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})</Text>
        <Image source={clockIcon} style={styles.clockIcon} />
      </TouchableOpacity>
      {showTimePickerSalida && (
        <DateTimePicker
          value={formData.horasalida}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={(event, selectedTime) => {
            setShowTimePickerSalida(false);
            if (selectedTime) {
              setFormData(prevData => ({ ...prevData, horasalida: selectedTime }));
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => setShowTimePickerLlegada(true)}
        style={styles.timeContainer}
      >
        <Text style={styles.timeText}>Hora de llegada ({formData.horallegada.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})</Text>
        <Image source={clockIcon} style={styles.clockIcon} />
      </TouchableOpacity>
      {showTimePickerLlegada && (
        <DateTimePicker
          value={formData.horallegada}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={(event, selectedTime) => {
            setShowTimePickerLlegada(false);
            if (selectedTime) {
              setFormData(prevData => ({ ...prevData, horallegada: selectedTime }));
            }
          }}
        />
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={loading} // Deshabilita el botón mientras se está cargando
      >
        {loading ? (
          // Muestra un indicador de carga si loading es verdadero
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          // Muestra el texto del botón normalmente si no hay carga
          <Text style={styles.buttonText}>EDITAR VUELO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditarVuelo;
