// app/page.tsx
"use client";  // Agrega esta línea

import React, { useState } from "react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AccordionNav from '@/components/ui/accordion-nav';
import FormularioReservas from '@/components/ui/formulario-reservas';


export default function MainPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Función para manejar el clic en los ítems del menú
  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <FormularioReservas/>
    </div>
  );
}
