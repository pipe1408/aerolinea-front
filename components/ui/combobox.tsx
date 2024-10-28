"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormEvent, useEffect, useState } from "react"

interface Vuelo {
    value: string;
    label: string;
}

interface ComboboxProps {
  sendValueToParent: (value: string) => void;
}

export function Combobox({ sendValueToParent }: ComboboxProps) {
    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const fetchFlights = async () => {
        try {
        const response = await fetch('https://arquitectura-aeropuerto-back-146516897953.us-central1.run.app/vuelos/get'); // Replace with your API URL
        const data = await response.json(); // Assuming the response is JSON
        const transformedData = data.map((flight: any) => ({
            value: flight.flightId,   // Using flightID for both value and label
            label: flight.flightId,   // Using flightID for both value and label
        }));
        setVuelos(transformedData); // Update the state with the flight data
        } catch (error) {
        console.error("Error fetching flights:", error);
        }
    };
    useEffect(() => {
        fetchFlights();
    }, []);
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const handleSendValue = (currentValue: string) => {
        sendValueToParent(currentValue) // Send value to parent via callback
    }

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
            {value
                ? vuelos.find((vuelo) => vuelo.value === value)?.label
                : "Seleccione un vuelo"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
            <Command>
                <CommandInput placeholder="Search vuelo..." />
                <CommandList>
                    <CommandEmpty>No vuelo found.</CommandEmpty>
                    <CommandGroup>
                    {vuelos.map((vuelo) => (
                        <CommandItem
                            key={vuelo.value}
                            value={vuelo.label}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                                handleSendValue(currentValue)
                            }}
                        >
                        <Check
                            className={cn(
                            "mr-2 h-4 w-4",
                            value === vuelo.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {vuelo.label}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
