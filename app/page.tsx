import Link from 'next/link';
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
  return (
    <div>
      <FormularioReservas/>
    </div>
  );
}
