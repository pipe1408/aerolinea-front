"use client";
import Link from 'next/link';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Título centrado */}
      <div className="text-center mt-20 mb-6">
        <h1 className="text-6xl font-bold text-white">BIENVENIDO</h1>
      </div>

      {/* Menú de Navegación debajo del título */}
      <NavigationMenu>
        <Menubar className="bg-white text-black p-4 flex space-x-4 border border-black rounded-lg mt-5">
          <MenubarMenu bg-white text-black>
            <MenubarTrigger className="text-lg font-semibold">Gestión de vuelos</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/Vuelos" passHref>
                  <MenubarShortcut className="text-sm">Crear vuelo</MenubarShortcut>
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="text-lg font-semibold">Reservas</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/Reservas" passHref>
                  <MenubarShortcut className="text-sm">Realizar nueva Reserva</MenubarShortcut>
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </NavigationMenu>
    </div>
  );
}
