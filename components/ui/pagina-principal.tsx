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

      {/* SVG del avión */}
      <div className="w-96 h-72 mb-8 flex items-center justify-center">
        <svg 
          fill="#001a4d" 
          viewBox="-1.85 -1.85 49.88 49.88" 
          className="w-48 h-48"
        >
          <g>
            <g>
              <path d="M7.746,32.708c-1.244-2.01-2.152-5.084-2.152-8.371c0-9.856,8.019-17.875,17.873-17.875c2.029,0,3.975,0.357,5.793,0.982 l-2.17-2.635c-1.177-0.219-2.385-0.348-3.623-0.348c-10.958,0-19.873,8.916-19.873,19.875c0,3.659,1.013,7.08,2.434,9.387 L7.746,32.708z"></path>
              <path d="M40.784,19.93c0.359,1.41,0.557,2.885,0.557,4.407c0,9.854-8.019,17.873-17.874,17.873c-4.185,0-8.027-1.453-11.071-3.875 l-1.77,1.127c3.463,2.955,7.941,4.748,12.841,4.748c10.959,0,19.874-8.916,19.874-19.873c0-0.726-0.051-1.437-0.127-2.14 L40.784,19.93z"></path>
              <path d="M46.157,18.898c-0.248-1.183-5.137-8.079-5.137-8.079s4.153-4.012,4.428-4.488c0.273-0.476,1.325-1.543-0.016-2.646 c-1.342-1.101-2.303-0.389-2.778,0.036c-0.477,0.427-4.044,3.622-4.044,3.622s-7.241-5.272-8.437-5.365 c-1.195-0.094-1.993,0.975-1.993,0.975l7.366,7.427l-3.61,4.259l-3.225-0.941l-1.783,1.098c0,0,3.539,1.543,4.239,2.432 c0.701,0.889,1.625,3.84,1.625,3.84l1.699-0.895l-0.793-3.885l4.098-3.262l7.025,7.704C44.823,20.73,46.405,20.081,46.157,18.898z"></path>
              <path d="M29.617,18.401c-0.666-0.625-1.729-1.018-1.729-1.018C19.088,25.935,8.106,35.353,5.717,35.656 c-0.907,0.065-1.479-0.146-1.705-0.634c-0.255-0.557-0.562-0.917,0.087-1.569l-1.856-4.137c-1.772,1.782-2.859,5.212-1.863,7.377 c0.868,1.888,2.735,2.974,5.062,2.974c0.188,0,0.381-0.008,0.574-0.021c4.728-0.352,20.071-14.934,24.662-19.393 C30.677,20.252,30.283,19.026,29.617,18.401z"></path>
            </g>
          </g>
        </svg>
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