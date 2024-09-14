import Link from 'next/link';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

export default function MainPage() {
  return (
    <div className="container">
      <div className="elegantshadow">
        <div className="enorme">Bienvenido
        </div>
      </div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Gestion de vuelos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/Vuelos" passHref>
                <MenubarShortcut>Crear vuelo</MenubarShortcut>
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Reservas</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/Reservas" passHref>
                  <MenubarShortcut>Nueva reserva</MenubarShortcut>
                </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Ver vuelos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/VerVuelos" passHref>
                <MenubarShortcut>Ver vuelos</MenubarShortcut>
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
