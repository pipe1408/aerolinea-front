// app/CrearVuelo/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getVuelos } from "../Services/vueloService";
import "./Vuelo.css"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definición del tipo Vuelo
type Vuelo = {
  flightId: string;
  origen: string;
  destino: string;
  fecha: string; // Puedes ajustar esto si necesitas un formato diferente
  asientosLibres: number;
};

const CrearVuelo = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cargar vuelos cuando se monta el componente
  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const data = await getVuelos();
        setVuelos(data);
      } catch (error) {
        setError("Error al cargar los vuelos");
      }
    };

    fetchVuelos();
  }, []);

  return (
    <div className="CrearVuelo">
      <h2>Lista de Vuelos</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flight ID</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Asientos Libres</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vuelos.length > 0 ? (
                vuelos.map((vuelo) => (
                  <TableRow key={vuelo.flightId}>
                    <TableCell>{vuelo.flightId}</TableCell>
                    <TableCell>{vuelo.origen}</TableCell>
                    <TableCell>{vuelo.destino}</TableCell>
                    <TableCell>{vuelo.fecha}</TableCell>
                    <TableCell>{vuelo.asientosLibres}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No hay vuelos disponibles</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CrearVuelo;
