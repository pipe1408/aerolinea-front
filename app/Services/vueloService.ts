import axios from 'axios';

// Configuración de la URL base de tu API
const API_URL = 'http://104.248.110.182/vuelos'; // Ajusta el puerto según tu configuración

// Función para obtener todos los vuelos
export const getVuelos = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data.map((vuelo: any) => ({
      flightId: vuelo.flightId,
      origen: vuelo.origen,
      destino: vuelo.destino,
      fecha: vuelo.fecha, // Asumimos que es un string en formato "yyyy-MM-dd"
      asientosLibres: vuelo.asientosLibres,
    }));
  } catch (error) {
    console.error("Error fetching vuelos", error);
    throw error;
  }
};

// Función para obtener un vuelo por ID
export const getVueloById = async (flightId: string) => {
  try {
    const response = await axios.get(`${API_URL}/find/${flightId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vuelo with ID: ${flightId}`, error);
    throw error;
  }
};

// Función para guardar un nuevo vuelo
export const guardarVuelo = async (vuelo: any) => {
  try {
    const response = await axios.post(`${API_URL}/guardar`, vuelo);
    return response.data;
  } catch (error) {
    console.error("Error saving vuelo", error);
    throw error;
  }
};
export const eliminarVuelo = async (flightId: String) => {
  try {
    const response = await axios.delete(`${API_URL}/borrar/${flightId}`);
    console.log("Hola");
    return response.data;
  } catch (error) {
    console.error('Error deleting vuelo', error);
    throw error;
  }
}
export const actualizarVuelo = async (vuelo: any) => {
  try {
    const response = await axios.put(`${API_URL}/actualizar`, vuelo);
    return response.data;
  } catch (error) {
    console.error("Error updating vuelo", error);
    throw error;
  }
};