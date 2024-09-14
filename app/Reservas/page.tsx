"use client";

import React, { useEffect, useState } from "react";
import { getPersonas } from "../Services/personaService";
import "./Reservas.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definición del tipo Persona
type Persona = {
  passportId: string;
  firstName: string;
  lastName: string;
};

const CrearPersona = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [filteredPersonas, setFilteredPersonas] = useState<Persona[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(""); // Filtro de búsqueda
  const [visibleColumns, setVisibleColumns] = useState({
    passportId: true,
    firstName: true,
    lastName: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Cargar personas cuando se monta el componente
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await getPersonas();
        setPersonas(data);
        setFilteredPersonas(data);
      } catch (error) {
        setError("Error al cargar las personas");
      }
    };

    fetchPersonas();
  }, []);

  // Filtrar personas por el nombre
  useEffect(() => {
    const filtered = personas.filter((persona) =>
      persona.firstName.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredPersonas(filtered);
    setCurrentPage(1); // Reiniciar paginación cuando se filtra
  }, [filter, personas]);

  // Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPersonas.slice(indexOfFirstItem, indexOfLastItem);

  // Paginación
  const totalPages = Math.ceil(filteredPersonas.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

    // Tipo específico para las claves de visibleColumns
    type ColumnKey = keyof typeof visibleColumns;
    
  // Cambiar visibilidad de columnas
  const toggleColumnVisibility = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="CrearPersona">
      <h2>Lista de Personas</h2> {/* Título encima de la tabla */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Filtro de búsqueda */}
          <input
            type="text"
            placeholder="Filter first names..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />

          {/* Selector de columnas */}
          <div className="column-toggle">
            <button onClick={() => toggleColumnVisibility("passportId")}>
              Toggle Passport ID
            </button>
            <button onClick={() => toggleColumnVisibility("firstName")}>
              Toggle First Name
            </button>
            <button onClick={() => toggleColumnVisibility("lastName")}>
              Toggle Last Name
            </button>
          </div>

          {/* Tabla */}
          <div className="table-container">
            <Table className="dark-table">
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead> {/* Columna para las checkboxes */}
                  {visibleColumns.passportId && <TableHead>Passport ID</TableHead>}
                  {visibleColumns.firstName && <TableHead>First Name</TableHead>}
                  {visibleColumns.lastName && <TableHead>Last Name</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((persona) => (
                    <TableRow key={persona.passportId}>
                      <TableCell>
                        <input type="checkbox" /> {/* Checkbox en cada fila */}
                      </TableCell>
                      {visibleColumns.passportId && <TableCell>{persona.passportId}</TableCell>}
                      {visibleColumns.firstName && <TableCell>{persona.firstName}</TableCell>}
                      {visibleColumns.lastName && <TableCell>{persona.lastName}</TableCell>}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No hay personas disponibles</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearPersona;
