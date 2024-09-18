"use client";
import React, { useState, useEffect } from "react";
import { getVuelos } from "../Services/vueloService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type Vuelo = {
  flightId: string;
  origen: string;
  destino: string;
  fecha: string;
  asientosLibres: number;
};

const CrearVuelo = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [filteredVuelos, setFilteredVuelos] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [visibleColumns, setVisibleColumns] = useState({
    flightId: true,
    origen: true,
    destino: true,
    fecha: true,
    asientosLibres: true,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const data = await getVuelos();
        setVuelos(data);
        setFilteredVuelos(data);
      } catch (error) {
        setError("Error al cargar los vuelos");
      }
    };

    fetchVuelos();
  }, []);

  useEffect(() => {
    const filtered = vuelos.filter((vuelo) =>
      vuelo.flightId.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredVuelos(filtered);
    setCurrentPage(1);
  }, [filter, vuelos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVuelos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredVuelos.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  type ColumnKey = keyof typeof visibleColumns;
  const toggleColumnVisibility = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-6xl px-4">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Lista de Vuelos</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <div className="mb-4 flex justify-between">
              <Input
                type="text"
                placeholder="Filtrar por Flight ID..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white w-full bg-gray-600 text-gray-200"
              />
              <div className="relative ml-4 ">
                <Button className="bg-black text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}>Columnas</Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <ul className="py-2 bg-black text-white">
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => toggleColumnVisibility("flightId")}
                        >
                          Flight ID
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => toggleColumnVisibility("origen")}
                        >
                          Origen
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => toggleColumnVisibility("destino")}
                        >
                          Destino
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => toggleColumnVisibility("fecha")}
                        >
                          Fecha
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => toggleColumnVisibility("asientosLibres")}
                        >
                          Asientos Libres
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Card className="w-full bg-black text-white">
              <Table className="table-auto w-full bg-black text-white">
                <TableHeader>
                  <TableRow>
                    {visibleColumns.flightId && <TableHead>Flight ID</TableHead>}
                    {visibleColumns.origen && <TableHead>Origen</TableHead>}
                    {visibleColumns.destino && <TableHead>Destino</TableHead>}
                    {visibleColumns.fecha && <TableHead>Fecha</TableHead>}
                    {visibleColumns.asientosLibres && <TableHead>Asientos Libres</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((vuelo) => (
                      <TableRow key={vuelo.flightId}>
                        {visibleColumns.flightId && <TableCell>{vuelo.flightId}</TableCell>}
                        {visibleColumns.origen && <TableCell>{vuelo.origen}</TableCell>}
                        {visibleColumns.destino && <TableCell>{vuelo.destino}</TableCell>}
                        {visibleColumns.fecha && <TableCell>{vuelo.fecha}</TableCell>}
                        {visibleColumns.asientosLibres && <TableCell>{vuelo.asientosLibres}</TableCell>}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>No hay vuelos disponibles</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Paginación */}
              <div className="flex items-center justify-center space-x-4 mt-6 bg-black text-white">
                <Button className="bg-black text-white"
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="h-4 w-4 bg-black text-white " />
                </Button>
                <span className="text-sm font-medium bg-black text-white">
                  Página {currentPage} de {totalPages}
                </span>
                <Button className="bg-black text-white"
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="h-4 w-4 bg-black text-white" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearVuelo;
