import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Container, Input, Button, ButtonText, ErrorText, LoadingText } from '../styles/LoginStyles'; // Asegúrate de importar LoadingText desde tus estilos
import { Alert, ActivityIndicator } from 'react-native';
import { BACKEND_URL } from '@env'

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true); // Establece el estado de carga a verdadero durante la solicitud
      const response = await axios.post(`${BACKEND_URL}/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Si la respuesta es exitosa, navegar al dashboard
        navigation.navigate('Dashboard');
      } else {
        // Si la respuesta es un error, mostrar mensaje de error
        setError(response.data.error);
      }
    } catch (error) {
      // Si hay un error en la solicitud, mostrar mensaje de error
      console.error('Error de inicio de sesión:', error);
      setError('Hubo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false); // Establece el estado de carga de nuevo a falso después de que se completa la solicitud
    }
  };

  return (
    <Container>
      <Input
        placeholder="Usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={handleLogin}>
        {loading ? (
          // Muestra un indicador de carga si loading es verdadero
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          // Muestra el texto del botón normalmente si no hay carga
          <ButtonText>Iniciar Sesión</ButtonText>
        )}
      </Button>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  );
}
