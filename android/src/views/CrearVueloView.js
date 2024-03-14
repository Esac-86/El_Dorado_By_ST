import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import clockIcon from '../img/clock.png';
import { crearVueloStyles as styles } from '../styles/CrearVueloStyles';
import { BACKEND_URL } from '@env'

const CrearVuelo = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    coddestino: "",
    codaerolinea: "",
    salaabordaje: "",
    horasalida: new Date(),
    horallegada: new Date(),
  });
  const [showTimePickerSalida, setShowTimePickerSalida] = useState(false);
  const [showTimePickerLlegada, setShowTimePickerLlegada] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChangeSalida = (event, selectedTime) => {
    setShowTimePickerSalida(false);
    if (selectedTime) {
      setFormData(prevData => ({
        ...prevData,
        horasalida: selectedTime,
      }));
    }
  };
  
  const handleTimeChangeLlegada = (event, selectedTime) => {
    setShowTimePickerLlegada(false);
    if (selectedTime) {
      setFormData(prevData => ({
        ...prevData,
        horallegada: selectedTime,
      }));
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (!formData.coddestino || !formData.codaerolinea || !formData.salaabordaje) {
        return Alert.alert("Error", "Todos los campos son obligatorios.");
      }
  
      setLoading(true); // Establecer el estado de carga a verdadero
      
      const horaSalida = formData.horasalida.toLocaleTimeString('en-US', { hour12: false });
      const horaLlegada = formData.horallegada.toLocaleTimeString('en-US', { hour12: false });
  
      const formattedData = {
        ...formData,
        horasalida: horaSalida,
        horallegada: horaLlegada,
      };
      const response = await axios.post(`${BACKEND_URL}/vuelos/crear`, formattedData);
  
      Alert.alert("Éxito", "Vuelo creado con éxito");
      navigation.goBack();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error al crear vuelo:", error.response.data.message);
      Alert.alert("Error", "Error al crear vuelo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false); // Restablecer el estado de carga a falso
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.codaerolinea}
          onValueChange={(itemValue) => handleInputChange('codaerolinea', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar aerolínea..." value="" />
          <Picker.Item label="Avianca" value="1" />
          <Picker.Item label="Satena" value="2" />
          <Picker.Item label="Wingo" value="3" />
          <Picker.Item label="Latam" value="4" />
          <Picker.Item label="Ultra Air" value="5" />
          <Picker.Item label="Easyfly" value="6" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.coddestino}
          onValueChange={(itemValue) => handleInputChange('coddestino', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar destino..." value="" />
          <Picker.Item label="Armenia" value="1" />
          <Picker.Item label="Barranquilla" value="2" />
          <Picker.Item label="Cali" value="3" />
          <Picker.Item label="Cartagena" value="4" />
          <Picker.Item label="Medellin" value="5" />
          <Picker.Item label="Santa Marta" value="6" />
          <Picker.Item label="San Andres" value="7" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.salaabordaje}
          onValueChange={(itemValue) => handleInputChange('salaabordaje', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar sala de abordaje..." value="" />
          <Picker.Item label="A1" value="A1" />
          <Picker.Item label="B2" value="B2" />
          <Picker.Item label="C3" value="C3" />
          <Picker.Item label="D4" value="D4" />
          <Picker.Item label="E5" value="E5" />
        </Picker>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>Hora de salida ({formData.horasalida.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})</Text>
        <TouchableOpacity onPress={() => setShowTimePickerSalida(true)}>
          <Image source={clockIcon} style={styles.clockIcon} />
        </TouchableOpacity>
      </View>
      {showTimePickerSalida && (
        <DateTimePicker
          value={formData.horasalida}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={handleTimeChangeSalida}
        />
      )}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>Hora de llegada ({formData.horallegada.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})</Text>
        <TouchableOpacity onPress={() => setShowTimePickerLlegada(true)}>
          <Image source={clockIcon} style={styles.clockIcon} />
        </TouchableOpacity>
      </View>
      {showTimePickerLlegada && (
        <DateTimePicker
          value={formData.horallegada}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={handleTimeChangeLlegada}
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
          <Text style={styles.buttonText}>CREAR VUELO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CrearVuelo;
