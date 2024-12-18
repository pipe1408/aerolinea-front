"use client";
import React, { useState, useEffect } from "react";
import { actualizarVuelo, eliminarVuelo, getVueloById, getVuelos, guardarVuelo } from "../Services/vueloService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PersonasTable from "@/components/ui/tabla-personas";
import { toast, Toaster } from "sonner";


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
  const [selectedVuelo, setSelectedVuelo] = useState<Vuelo | null>(null);

  // Estado para manejar el formulario de nuevo vuelo
  const [nuevoVuelo, setNuevoVuelo] = React.useState({
    vueloId: '',
    origen: '',
    destino: '',
    fecha: '',
    asientosDisponibles: 0
  });
  
  const [vueloAModificar, setVueloAModificar] = useState<Vuelo>({
    flightId: '',
    origen: '',
    destino: '',
    fecha: '',
    asientosLibres: 0
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoVuelo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleGuardarVuelo = async () => {
    try {
      await guardarVuelo(nuevoVuelo);
      alert('Vuelo guardado exitosamente');
  
      // Recargar la página después de guardar
      window.location.reload();
    } catch (error) {
      alert('Error al guardar el vuelo');
    }
  };
  const [vueloIdEliminar, setVueloIdEliminar] = React.useState('');

  const handleEliminarVuelo = async () => {
    try {
      // Verifica si el vuelo existe
      const vuelo = await getVueloById(vueloIdEliminar);
  
      // Si el vuelo no existe, informa al usuario y detiene la ejecución
      if (!vuelo) {
        alert('El vuelo no existe');
        return;
      }
  
      // Si el vuelo existe, procede con la eliminación
      await eliminarVuelo(vueloIdEliminar);
      alert('Vuelo eliminado exitosamente');
  
      // Actualiza la página después de eliminar
      window.location.reload();
    } catch (error: any) {
      // Manejar el caso de que el vuelo tenga pasajeros y no pueda ser eliminado
      if (error.response && error.response.status === 500) {
        // Mostramos un mensaje claro para el usuario
        alert('El vuelo no puede ser eliminado porque ya tiene pasajeros asignados.');
      } else if (error.response && error.response.status === 404) {
        // Si la API devuelve un 404, informa que el vuelo no existe
        alert('El vuelo no existe');
      } else {
        // Maneja otros tipos de errores
        console.error('Error al eliminar el vuelo:', error);
        alert('Error inesperado al eliminar el vuelo');
      }
  
      // Recargar la página para evitar un estado inconsistente
      window.location.reload();
    }
  };
  
  


const handleBuscarVuelo = async (id: string) => {
  try {
    const vuelo = await getVueloById(id);

    
    // Actualiza solo los campos que no son flightId
    setVueloAModificar(prev => ({
      ...prev,
      ...vuelo, // Sobrescribe con los datos del vuelo
      flightId: prev.flightId // Mantén el flightId ingresado
    }));
  } catch (error) {
    alert('Error al buscar el vuelo');
  }
};

  const itemsPerPage = 10;

  useEffect(() => {
    toast.info("Seleccione un vuelo para ver la lista de pasajeros")
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

  const [vueloModificado, setVueloModificado] = useState<Vuelo>({
    flightId: "",
    origen: "",
    destino: "",
    fecha: "",
    asientosLibres: 0, 
  });


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

  const handleModificarVuelo = async () => {
    try {
      const response = await fetch("https://arquitectura-aeropuerto-back-146516897953.us-central1.run.app/vuelos/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vueloId: vueloModificado.flightId,
          origen: vueloModificado.origen,
          destino: vueloModificado.destino,
          fecha: vueloModificado.fecha,
          asientosDisponibles: vueloModificado.asientosLibres,
        }),
      });
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data); 
  
      if (data.successful) { 
        
        const nuevosVuelos = vuelos.map((vuelo) =>
          vuelo.flightId === vueloModificado.flightId ? vueloModificado : vuelo
        );
        setVuelos(nuevosVuelos);
        setPopoverModifyOpen(false);
      } else {
        alert("Error al modificar vuelo: " + data.mensaje); 
      }
    } catch (error) {
      console.error("Error al modificar vuelo", error);
    }
  };

  return (
    <div className="flex align-center "style={{ marginLeft: "90px"}}>
      <div className="ml-10 mr-10 w-full max-w-[60%] h-full"style={{ marginLeft: "90px", marginTop: "15px"}} >
        <h2>Lista de Vuelos</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <div className="mb-4 flex justify-between">
              <Input
                type="text"
                placeholder="Filtrar por Flight ID..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white "
              />
              <div className="relative ml-4">
                <Button className="bg-white text-black" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  Columnas
                </Button>
                {dropdownOpen && (
                  <ul className="absolute z-10 py-2 bg-white text-black shadow-lg max-h-48 overflow-y-auto">
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
                )}
              </div>
            </div>
            <Card className="w-auto">
              <Table className="table-auto w-full bg-white text-black">
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
                      <TableRow 
                        key={vuelo.flightId} 
                        onClick={() => setSelectedVuelo(vuelo)}
                        className="cursor-pointer hover:bg-gray-100"
                      >
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
      <div><Separator className="h-full w-px bg-gray-300 m-0" /></div>
      <div style={{marginTop: "155px"}}>
      <div className="flex flex-col justify-center items-center space-y-20" style={{marginLeft: "30px", marginTop: "-80px", height:"500px"}}>
  
  <Popover>
      <PopoverTrigger asChild>
      <Button className="bg-white text-black shadow-lg" style={{ height: "50px", width: "200px", border: "3px solid black" }}>
  Nuevo vuelo ▼
</Button>
</PopoverTrigger>
<PopoverContent className="w-90">
  <div className="grid gap-4">
    <Label htmlFor="vueloId">Flight ID</Label>
    <Input
      id="vueloId"
      type="text"
      name="vueloId"
      placeholder="Flight ID"
      value={nuevoVuelo.vueloId}
      onChange={handleInputChange}
      required
    />
    <Label htmlFor="origen">Origen</Label>
    <Input
      id="origen"
      type="text"
      name="origen"
      placeholder="Origen"
      value={nuevoVuelo.origen}
      onChange={handleInputChange}
      required
    />
    <Label htmlFor="destino">Destino</Label>
    <Input
      id="destino"
      type="text"
      name="destino"
      placeholder="Destino"
      value={nuevoVuelo.destino}
      onChange={handleInputChange}
      required
    />
    <Label htmlFor="fecha">Fecha</Label>
    <Input
      id="fecha"
      type="date"
      name="fecha"
      value={nuevoVuelo.fecha}
      onChange={handleInputChange}
      required
    />
    <Label htmlFor="asientosDisponibles">Asientos Disponibles</Label>
    <Input
      id="asientosDisponibles"
      type="number"
      name="asientosDisponibles"
      placeholder="Asientos Disponibles"
      value={nuevoVuelo.asientosDisponibles}
      onChange={handleInputChange}
      required
    />
    <Button className="mt-2" onClick={handleGuardarVuelo}>
      Guardar
    </Button>
  </div>
</PopoverContent>
  </Popover>

  <Popover open={popoverDeleteOpen} onOpenChange={handlePopoverDeleteToggle}>
  <PopoverTrigger asChild>
    <Button className="bg-white text-black shadow-lg" style={{ height: "50px", width: "200px", border: "3px solid black" }}>
      Eliminar vuelo ▼
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-90">
    <div className="grid gap-4">
      <Label htmlFor="vueloIdEliminar">Flight ID para eliminar</Label>
      <Input
        id="vueloIdEliminar"
        type="text"
        name="vueloIdEliminar"
        placeholder="Flight ID"
        value={vueloIdEliminar}
        onChange={(e) => setVueloIdEliminar(e.target.value)}
      />
      <Button className="mt-2" onClick={handleEliminarVuelo}>
        Eliminar
      </Button>
    </div>
      </PopoverContent>

  </Popover>

  <Popover open={popoverModifyOpen} onOpenChange={handlePopoverModifyToggle}>
  <PopoverTrigger asChild>
    <Button className="bg-white text-black shadow-lg" style={{ height: "50px", width: "200px", border: "3px solid black" }}>Modificar vuelo ▼</Button>
  </PopoverTrigger>
  <PopoverContent className="w-90">
    <div className="grid gap-4">
      <Label>Flight ID</Label>
      <Input 
        type="text" 
        placeholder="Flight ID" 
        value={vueloModificado.flightId}
        onChange={(e) => setVueloModificado({ ...vueloModificado, flightId: e.target.value })}
      />
      <Label>Origen</Label>
      <Input 
        type="text" 
        placeholder="Nuevo Origen" 
        value={vueloModificado.origen}
        onChange={(e) => setVueloModificado({ ...vueloModificado, origen: e.target.value })}
      />
      <Label>Destino</Label>
      <Input 
        type="text" 
        placeholder="Nuevo Destino" 
        value={vueloModificado.destino}
        onChange={(e) => setVueloModificado({ ...vueloModificado, destino: e.target.value })}
      />
      <Label>Fecha</Label>
      <Input 
        type="date" 
        value={vueloModificado.fecha}
        onChange={(e) => setVueloModificado({ ...vueloModificado, fecha: e.target.value })}
      />
      <Label>Asientos Libres</Label>
      <Input 
        type="number" 
        placeholder="Nuevo Asientos Libres" 
        value={vueloModificado.asientosLibres}
        onChange={(e) => setVueloModificado({ ...vueloModificado, asientosLibres: parseInt(e.target.value) })}
      />
      <Button className="mt-2" onClick={handleModificarVuelo}>Modificar</Button>
    </div>
  </PopoverContent>
</Popover>
<Link href = "/" passHref>
  <Button className="bg-white text-black shadow-lg" style={{ height: "50px", width: "200px", border: "3px solid black" }}>
    Volver
  </Button>
</Link>
</div>
</div>
<Dialog open={!!selectedVuelo} onOpenChange={() => setSelectedVuelo(null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Manifiesto de Pasajeros</DialogTitle>
    </DialogHeader>
    <PersonasTable flightId={selectedVuelo?.flightId || ''}/>
  </DialogContent>
</Dialog>
<Toaster/>
</div>
  );
};




export default CrearVuelo;