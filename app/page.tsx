// app/page.tsx
"use client";  // Agrega esta línea

import React, { useState } from "react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

export default function MainPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Función para manejar el clic en los ítems del menú
  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="container">
      <div className="elegantshadow">
        <div className="enorme">Bienvenido</div>
      </div>

      <title>PRUEBA 1</title>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Gestion de vuelos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <a href="/CrearVuelo" target="_blank" rel="noopener noreferrer">
                <MenubarShortcut>Crear vuelo</MenubarShortcut>
              </a>
            </MenubarItem>
            <MenubarItem>
              <a href="/EliminarVuelo" target="_blank" rel="noopener noreferrer">
                <MenubarShortcut>Eliminar vuelo</MenubarShortcut>
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Reservas</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <MenubarShortcut>Nueva reserva</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <MenubarShortcut>Eliminar reserva</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Ver vuelos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <MenubarShortcut>Ver vuelos</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
