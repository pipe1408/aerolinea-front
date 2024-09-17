"use client";

import React, { useEffect, useState } from "react";
import { getPersonas } from "../Services/personaService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FormularioReservas from "@/components/ui/formulario-reservas";

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
  const itemsPerPage = 9;
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control del menú desplegable

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

  // Cambiar visibilidad de columnas
  type ColumnKey = keyof typeof visibleColumns;
  const toggleColumnVisibility = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <FormularioReservas/>
  );
};

export default CrearPersona;
