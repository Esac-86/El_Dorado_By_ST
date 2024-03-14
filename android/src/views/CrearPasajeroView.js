import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { crearPasajeroStyles as styles } from '../styles/CrearPasajeroStyles'; // Importar los estilos
import { BACKEND_URL } from '@env'; // Importar la variable BACKEND_URL
import { getDestinoName } from '../functions/FlightUtils'; // Importar la función getDestinoName
import getData from '../functions/GetData'; // Importar la función getData

const CrearPasajero = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [vuelos, setVuelos] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [selectedVuelo, setSelectedVuelo] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        nombres: '',
        apellidos: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
        // Acceder a los vuelos desde los parámetros de la navegación
        const vuelosData = route.params.vuelos || [];
        setVuelos(vuelosData);

        // Obtener la información actualizada de los destinos
        getData().then(({ destinos }) => {
            setDestinos(destinos);
        }).catch(error => {
            console.error('Error al obtener los destinos:', error);
        });
    }, [route.params.vuelos]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/pasajeros/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: formData.id,
                    nombres: formData.nombres,
                    apellidos: formData.apellidos,
                    email: formData.email,
                    telefono: formData.telefono,
                    codvuelo: selectedVuelo
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Pasajero creado exitosamente:', data.nuevoPasajero);
                // Mostrar un mensaje de éxito
                Alert.alert('Éxito', 'Pasajero creado exitosamente');
                navigation.goBack();
            } else {
                // Mostrar un mensaje de error
                Alert.alert('Error', data.message);
                console.error('Error al crear pasajero:', data.message);
            }
        } catch (error) {
            // Mostrar un mensaje de error genérico
            Alert.alert('Error', 'Error al enviar el formulario');
            console.error('Error al enviar el formulario:', error);
        }
    };



    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={formData.id}
                onChangeText={(text) => handleInputChange('id', text)}
                placeholder="Identificación"
                style={styles.input}
            />
            <TextInput
                value={formData.nombres}
                onChangeText={(text) => handleInputChange('nombres', text)}
                placeholder="Nombres"
                style={styles.input}
            />
            <TextInput
                value={formData.apellidos}
                onChangeText={(text) => handleInputChange('apellidos', text)}
                placeholder="Apellidos"
                style={styles.input}
            />
            <TextInput
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Email"
                style={styles.input}
            />
            <TextInput
                value={formData.telefono}
                onChangeText={(text) => handleInputChange('telefono', text)}
                placeholder="Teléfono"
                style={styles.input}
            />
            <Picker
                selectedValue={selectedVuelo}
                onValueChange={(itemValue) => setSelectedVuelo(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Seleccionar vuelo..." value="" />
                {vuelos.map((vuelo, index) => (
                    <Picker.Item key={index} label={`${vuelo.codvuelo} - ${getDestinoName(vuelo.coddestino, destinos)}`} value={vuelo.codvuelo} />
                ))}
            </Picker>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Crear Pasajero</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CrearPasajero;
