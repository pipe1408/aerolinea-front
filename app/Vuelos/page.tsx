"use client";
import React, { useState, useEffect } from "react";
import { getVuelos } from "../Services/vueloService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";


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
  const [currentPage, setCurrentPage] = useState(1);
  const [popoverCreateOpen, setPopoverCreateOpen] = useState(false); // Control del popover de crear vuelo
  const [popoverDeleteOpen, setPopoverDeleteOpen] = useState(false); // Control del popover de eliminar vuelo
  const [popoverModifyOpen, setPopoverModifyOpen] = useState(false); // Control del popover de modificar vuelo
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handlePopoverCreateToggle = () => {
    setPopoverCreateOpen((prev) => !prev);
    setPopoverDeleteOpen(false);
    setPopoverModifyOpen(false);
  };

  const handlePopoverDeleteToggle = () => {
    setPopoverDeleteOpen((prev) => !prev);
    setPopoverCreateOpen(false);
    setPopoverModifyOpen(false);
  };

  const handlePopoverModifyToggle = () => {
    setPopoverModifyOpen((prev) => !prev);
    setPopoverCreateOpen(false);
    setPopoverDeleteOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div className="ml-10">
        <h2>Lista de Vuelos</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <div>
              <Input
                type="text"
                placeholder="Filtrar por Flight ID..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white"
              />
              <div className="dropdown">
                <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
                  Columnas
                </Button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <button onClick={() => toggleColumnVisibility("flightId")}>Flight ID</button>
                    </li>
                    <li>
                      <button onClick={() => toggleColumnVisibility("origen")}>Origen</button>
                    </li>
                    <li>
                      <button onClick={() => toggleColumnVisibility("destino")}>Destino</button>
                    </li>
                    <li>
                      <button onClick={() => toggleColumnVisibility("fecha")}>Fecha</button>
                    </li>
                    <li>
                      <button onClick={() => toggleColumnVisibility("asientosLibres")}>Asientos Libres</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <Card className="w-auto">
              <Table>
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
              <div className="flex items-center justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div><Separator orientation="vertical"/></div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="button popover-trigger">Nuevo vuelo ▼</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <Label>Flight ID</Label>
              <Input type="text" placeholder="Flight ID" />
              <Label>Origen</Label>
              <Input type="text" placeholder="Origen" />
              <Label>Destino</Label>
              <Input type="text" placeholder="Destino" />
              <Label>Fecha</Label>
              <Input type="date" />
              <Label>Asientos Libres</Label>
              <Input type="number" placeholder="Asientos Libres" />
              <Button className="mt-2">Guardar</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Popover para eliminar un vuelo */}
        <Popover open={popoverDeleteOpen} onOpenChange={handlePopoverDeleteToggle}>
          <PopoverTrigger asChild>
            <Button className="button popover-trigger">Eliminar vuelo ▼</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <Label>Flight ID para eliminar</Label>
              <Input type="text" placeholder="Flight ID" />
              <Button className="mt-2">Eliminar</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Popover para modificar un vuelo */}
        <Popover open={popoverModifyOpen} onOpenChange={handlePopoverModifyToggle}>
          <PopoverTrigger asChild>
            <Button className="button popover-trigger">Modificar vuelo ▼</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <Label>Flight ID</Label>
              <Input type="text" placeholder="Flight ID" />
              <Label>Origen</Label>
              <Input type="text" placeholder="Nuevo Origen" />
              <Label>Destino</Label>
              <Input type="text" placeholder="Nuevo Destino" />
              <Label>Fecha</Label>
              <Input type="date" />
              <Label>Asientos Libres</Label>
              <Input type="number" placeholder="Nuevo Asientos Libres" />
              <Button className="mt-2">Modificar</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};




export default CrearVuelo;

