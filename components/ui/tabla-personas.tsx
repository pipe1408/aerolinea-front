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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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

const flightStates = [
  "PROGRAMADO",
  "CONFIRMADO",
  "ABORDANDO",
  "CERRADO",
  "EN_VUELO",
  "ATERRIZO",
  "CANCELADO"
];

function PersonasTable({ flightId }: { flightId: string }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`https://arquitectura-aeropuerto-back-146516897953.us-central1.run.app/find-vuelo/${flightId}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching pasajeros:', error);
      }
    };

    if (flightId) {
      fetchReservations();
    }
  }, [flightId]);

  const updateFlightState = async () => {
    if (!selectedState) {
      alert("Please select a state");
      return;
    }

    try {
      const response = await axios.put(
        'https://arquitectura-aeropuerto-back-146516897953.us-central1.run.app/estados',
        {
          flightId: flightId,
          state: selectedState
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      alert(`Flight state updated successfully to ${selectedState}`);
    } catch (error) {
      console.error('Error updating flight state:', error);
      alert('Failed to update flight state');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select onValueChange={setSelectedState}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select flight state" />
          </SelectTrigger>
          <SelectContent>
            {flightStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={updateFlightState}>Update Flight State</Button>
      </div>

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
              <TableCell colSpan={4} className="text-center">
                No reservations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default PersonasTable;

