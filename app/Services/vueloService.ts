import axios from 'axios';

// Configuración de la URL base de tu API
const API_URL = 'http://104.248.110.182/vuelos'; // Ajusta el puerto según tu configuración

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
