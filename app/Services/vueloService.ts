// services/vueloService.ts
import axios from 'axios';

// Configuración de la URL base de tu API
const API_URL = 'http://45.55.107.234:8080/personas/get'; // Ajusta el puerto según tu configuración

export const getVuelos = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vuelos", error);
    throw error;
  }
};

export const getVueloById = async (flightId: string) => {
  try {
    const response = await axios.get(`${API_URL}/find/${flightId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vuelo with ID: ${flightId}`, error);
    throw error;
  }
};

// Otros métodos para guardar, actualizar y borrar vuelos también podrían estar aquí.
