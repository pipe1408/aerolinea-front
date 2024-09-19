import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

interface Flight {
    flightId: string;
    origen: string;
    destino: string;
    fecha: string;
    asientosLibres: number;
}

interface Passport {
    passportId: string;
    firstName: string;
    lastName: string;
}

interface Reservation {
    ticketId: number;
    flight: Flight;
    passport: Passport;
}
  
  

function PersonasTable({ flightId }: { flightId: string }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://104.248.110.182/reservas/find-vuelo/${flightId}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching pasajeros:', error);
      }
    };

    if (flightId) {
      fetchReservations();
    }
  }, [flightId]);

  return (
    <Table>
      <TableCaption>Lista de pasajeros</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Pasaporte</TableHead>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead className="w-[100px]">Apellido</TableHead>
          <TableHead className="w-[100px]">Ticket ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <TableRow key={reservation.ticketId}>
              <TableCell className="font-medium">{reservation.passport.passportId}</TableCell>
              <TableCell className="font-medium">{reservation.passport.firstName}</TableCell>
              <TableCell className="font-medium">{reservation.passport.lastName}</TableCell>
              <TableCell className="font-medium">{reservation.ticketId}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              No reservations found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PersonasTable;
