"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Combobox } from "./combobox"

export default function FormularioReservas() {
  const [formData, setFormData] = useState({
    ticketId: "",
    passport: "",
    firstName: "",
    lastName: "",
    flightId: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    toast("Reserva creada con éxito.")
    console.log("Form submitted", formData)
  }

  return (
    <div className="flex justify-center items-center m-4">
      <Tabs defaultValue="agregar" className="w-[350px]">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="agregar">Agregar</TabsTrigger>
          <TabsTrigger className="w-full" value="consultar">Consultar</TabsTrigger>
        </TabsList>
        <TabsContent value="agregar">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Reservas</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="flex flex-col justify-between">
                <div className="space-y-2">
                  <Label htmlFor="ticketId">Ticket ID</Label>
                  <Input 
                    id="ticketId" 
                    placeholder="Enter ticket ID" 
                    disabled 
                    value={formData.ticketId}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passport">Passport</Label>
                  <Input 
                    id="passport" 
                    placeholder="Enter passport number" 
                    required 
                    value={formData.passport}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter first name" 
                    required 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter last name" 
                    required 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-6">
                  <Combobox/>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Submit Reservation</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="consultar">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Reservas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between">
              <div className="space-y-2">
                <Label htmlFor="ticketId">Ticket ID</Label>
                <Input 
                  id="ticketId" 
                  placeholder="Enter ticket ID" 
                  required 
                  value={formData.ticketId}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passport">Passport</Label>
                <Input 
                  id="passport" 
                  placeholder="Enter passport number" 
                  disabled 
                  value={formData.passport}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="Enter first name" 
                  disabled 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Enter last name" 
                  disabled 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Ver Vuelos</Button>
              <div className="w-full flex justify-between">
                <Button variant="outline">Modificar pasajero</Button>
                <Button variant="destructive">Eliminar pasajero</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster/>
    </div>
  )
}