import { StyleSheet } from 'react-native';

export const verPasajerosStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#555',
    textAlign: 'center', // Centrar el título
    textTransform: 'uppercase', // Convertir el texto en mayúsculas
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
},

deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},

});
