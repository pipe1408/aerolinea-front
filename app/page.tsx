// app/page.tsx
"use client";
import React, { useState } from "react";
import CrearVuelo from "./CrearVuelo";
import EliminarVuelo from "./EliminarVuelo";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";


export default function MainPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Función para manejar el clic en los ítems del menú
  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="container">
      <div className="enorme">Bienvenido</div>
      <title>PRUEBA 1</title>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Gestion de vuelos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleMenuClick('crear')}>
              <MenubarShortcut>Crear vuelo</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => handleMenuClick('eliminar')}>
              <MenubarShortcut>Eliminar vuelo</MenubarShortcut>
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

      <div className="content">
        {/* Renderiza el componente basado en el estado activeComponent */}
        {activeComponent === 'crear' && <CrearVuelo />}
        {activeComponent === 'eliminar' && <EliminarVuelo />}
        {/* Agrega más componentes aquí según sea necesario */}
      </div>
    </div>
  );
}
