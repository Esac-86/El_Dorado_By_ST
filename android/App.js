import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './src/views/LoginView'
import DashboardView from './src/views/DashboardView';
import DetallesVuelo from './src/views/DetallesVueloView';
import CrearVuelo from './src/views/CrearVueloView'
import EditarVuelo from './src/views/EditarVueloView'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginView} options={{ title: '' }} />
        <Stack.Screen name="Dashboard" component={DashboardView} options={{ title: '' }} />
        <Stack.Screen name="DetallesVuelo" component={DetallesVuelo} options={{ title: '' }} />
        <Stack.Screen name="CrearVuelo" component={CrearVuelo} options={{ title: '' }} />
        <Stack.Screen name="EditarVuelo" component={EditarVuelo} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}