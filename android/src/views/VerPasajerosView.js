import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { verPasajerosStyles as styles } from '../styles/VerPasajerosStyles'; // Ajusta la importación según la ubicación real de tus estilos
import { BACKEND_URL } from '@env';

export default function VerPasajeros({ route, navigation }) {
    const codvuelo = route.params ? route.params.codvuelo : null;
    const [pasajeros, setPasajeros] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (codvuelo) {
            cargarPasajeros(codvuelo);
        }
    }, [codvuelo]);

    const cargarPasajeros = (codvuelo) => {
        setRefreshing(true);
        setError('');
        axios.get(`${BACKEND_URL}/pasajeros/consultar/${codvuelo}`)
            .then(response => {
                if (response.status === 200) {
                    setPasajeros(response.data.pasajeros);
                }
            })
            .catch(error => {
                if (error.response && error.response.status !== 404) {
                    console.error('Error al obtener la lista de pasajeros:', error);
                    setError('Hubo un error al cargar la lista de pasajeros. Por favor, inténtalo de nuevo más tarde.');
                }
            })
            .finally(() => {
                setRefreshing(false);
            });
    };

    const handleEliminarPasajero = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${BACKEND_URL}/pasajeros/eliminar/${id}`);
            if (response.status === 204) {
                Alert.alert('Pasajero Eliminado', 'El pasajero ha sido eliminado correctamente.');
                const newPasajeros = pasajeros.filter(pasajero => pasajero.id !== id);
                setPasajeros(newPasajeros);
            }
        } catch (error) {
            console.error('Error al eliminar el pasajero:', error);
            Alert.alert('Error', 'Hubo un error al eliminar el pasajero. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const mostrarConfirmacionEliminarPasajero = (id) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que deseas eliminar este pasajero?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => handleEliminarPasajero(id),
                },
            ],
            { cancelable: true }
        );
    };
    
    return (
        <View style={styles.container}>
            {error ? (
                <View style={styles.card}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => cargarPasajeros(codvuelo)}
                            colors={['#6B46C1']}
                            tintColor={'#6B46C1'}
                        />
                    }
                >
                    {pasajeros.length === 0 ? (
                        <View style={styles.card}>
                            <Text style={styles.text}>No hay pasajeros en este vuelo.</Text>
                        </View>
                    ) : (
                        pasajeros.map((pasajero) => (
                            <View key={pasajero.id} style={styles.card}>
                                <Text style={styles.text}>ID: {pasajero.id}</Text>
                                <Text style={styles.text}>Nombres: {pasajero.nombres}</Text>
                                <Text style={styles.text}>Apellidos: {pasajero.apellidos}</Text>
                                <Text style={styles.text}>Email: {pasajero.email}</Text>
                                <Text style={styles.text}>Teléfono: {pasajero.telefono}</Text>
                                <TouchableOpacity
                                    onPress={() => mostrarConfirmacionEliminarPasajero(pasajero.id)}
                                    style={styles.deleteButton}
                                    disabled={loading} // Deshabilita el botón mientras se está eliminando el pasajero
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.deleteButtonText}>X</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}
