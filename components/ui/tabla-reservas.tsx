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
  
  

function ReservationTable({ passportId }: { passportId: string }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://104.248.110.182/reservas/find-persona/${passportId}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    if (passportId) {
      fetchReservations();
    }
  }, [passportId]);

  return (
    <Table>
      <TableCaption>Reservas del pasajero</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ticket ID</TableHead>
          <TableHead className="w-[100px]">ID Vuelo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <TableRow key={reservation.ticketId}>
              <TableCell className="font-medium">{reservation.ticketId}</TableCell>
              <TableCell className="font-medium">{reservation.flight.flightId}</TableCell>
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

export default ReservationTable;
