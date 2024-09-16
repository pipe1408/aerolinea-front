// app/Services/personaService.ts
import axios from "axios";

const API_URL = 'http://104.248.110.182/personas'; // Ajusta el puerto según tu configuración

export const getPersonas = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching personas", error);
    throw error;
  }
};

export const getPersonaById = async (passportId: string) => {
  try {
    const response = await axios.get(`${API_URL}/find/${passportId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching persona with ID: ${passportId}`, error);
    throw error;
  }
};

// Otros métodos para guardar, actualizar y borrar personas también podrían estar aquí.
