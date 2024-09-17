"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast, Toaster } from "sonner"

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
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto my-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Reservas</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="flightId">Flight ID</Label>
              <Input 
                id="flightId" 
                placeholder="Enter flight ID" 
                required 
                value={formData.flightId}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Reservation</Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster/>
    </div>
  )
}