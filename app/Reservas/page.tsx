// app/CrearVuelo/page.tsx
"use client";

import React from "react";
import "./Reservas.css"; // Ajusta la ruta según tu estructura de proyecto
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// Importamos el componente de la tarjeta con formulario

const CrearReserva = () => {
  return (
    <div className="CrearReserva">
      {/* Aquí va la card con el formulario */}
      <div className="card-container">
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Hacer una nueva Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Pasaporte">Pasaporte</Label>
              <Input id="Pasaporte" placeholder="Inserte el pasaporte" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="NumeroDeVuelo">Numero de Vuelo</Label>
              <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem 
            
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>
          </div>
        </form>
      </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline">Hacer Reserva</Button>
            <Button>Borrar</Button>
        </CardFooter>
    </Card>
      </div>
    </div>
  );
};

export default CrearReserva;
