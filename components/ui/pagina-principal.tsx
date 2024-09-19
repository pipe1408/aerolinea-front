"use client";
import Link from 'next/link';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Título centrado */}
      <div className="text-center mt-20 mb-6">
        <h1 className="text-6xl font-bold text-black">BIENVENIDO</h1>
      </div>

      {/* Menú de Navegación debajo del título */}
      <NavigationMenu>
        <Menubar className="bg-white text-black p-4 flex space-x-4 border border-black rounded-lg mt-5">
          <MenubarMenu bg-white text-black>
            <MenubarTrigger className="text-lg font-semibold">Vuelos</MenubarTrigger>
            <MenubarContent>
            <Link href="/Vuelos" passHref>
                <MenubarItem>
                  <MenubarShortcut className="text-sm">Gestión de vuelos</MenubarShortcut>
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="text-lg font-semibold">Reservas</MenubarTrigger>
            <MenubarContent>
              
              <Link href="/Reservas" passHref>
                <MenubarItem>
                  <MenubarShortcut className="text-sm">Gestión de reservas</MenubarShortcut>
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </NavigationMenu>
    </div>
  );
}
