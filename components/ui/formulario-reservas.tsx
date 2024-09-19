"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Combobox } from "./combobox"
import axios from "axios"

export default function FormularioReservas() {
  const [formData, setFormData] = useState({
    ticketId: "",
    passport: "",
    firstName: "",
    lastName: "",
    flightId: ""
  })

  const [fieldsDisabled, setFieldsDisabled] = useState({
    firstName: true,
    lastName: true
  })

  const handleReceiveValue = (value:string) => {
    console.log("Received value from child:", value)
    setFormData(prevData => ({
      ...prevData,
      flightId: value
    }))
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  
    if (id === 'passport') {
      
      if (value.trim() === "") {
        // Disable fields when passport is empty
        setFieldsDisabled({
          firstName: true,
          lastName: true
        })
        // Clear firstName and lastName fields
        setFormData(prevData => ({
          ...prevData,
          firstName: "",
          lastName: ""
        }))
      } else{
        try {
          const response = await axios.get(`http://104.248.110.182/personas/find/${value}`)
          if (response.data) {
            const { firstName, lastName } = response.data
            setFormData(prevData => ({
              ...prevData,
              firstName: firstName || prevData.firstName,
              lastName: lastName || prevData.lastName
            }))
  
            setFieldsDisabled({
              firstName: true,
              lastName: true
            })
          } else {
            setFieldsDisabled({
              firstName: false,
              lastName: false
            })
  
            setFormData(prevData => ({
              ...prevData,
              firstName: "",
              lastName: ""
            }))
            // Handle the case when the response is null
            console.log('No data found for this passport.')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Execute the first POST request
      const firstResponse = await axios.post('http://104.248.110.182/personas/guardar', {
        pasaporteId: formData.passport,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
      console.log('First POST request successful')
      toast(`${JSON.stringify(firstResponse.data.mensaje)}`)

      // Execute the second POST request
      const secondResponse = await axios.post('http://104.248.110.182/reservas/guardar', {
        vueloId: formData.flightId,
        pasajeroId: formData.passport,
      })
      console.log('Second POST request successful')
      toast(`${JSON.stringify(secondResponse.data.mensaje)}`)
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    console.log("Form submitted", formData)
  }

  const wipeForm = () => {
    setFormData({
      ticketId: "",
      passport: "",
      firstName: "",
      lastName: "",
      flightId: ""
    });
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, ticketId: value });

    if (value) {
      try {
        const response = await fetch(`http://104.248.110.182/reservas/find/${value}`);
        const data = await response.json();

        if (data) {
          setFormData({
            ticketId: data.ticketId,
            passport: data.passport.passportId,
            firstName: data.passport.firstName,
            lastName: data.passport.lastName,
            flightId: data.flight.flightId
          });
        } else {
          setFormData({
            ticketId: value,
            passport: "",
            firstName: "",
            lastName: "",
            flightId: ""
          });
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center m-4">
      <Tabs defaultValue="agregar" className="w-[350px]">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="agregar" onClick={wipeForm}>Agregar</TabsTrigger>
          <TabsTrigger className="w-full" value="consultar" onClick={wipeForm}>Consultar</TabsTrigger>
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
                    disabled={fieldsDisabled.firstName}
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
                    disabled={fieldsDisabled.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-6">
                  <Combobox sendValueToParent={handleReceiveValue}/>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full">Submit Reservation</Button>
                <Button variant="ghost" className="w-full">Volver</Button>
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
                  type="number" 
                  value={formData.ticketId}
                  onChange={handleInputChange}
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
              <div className="mt-6">
                <Input 
                      id="flightInput" 
                      placeholder="Vuelo" 
                      required 
                      disabled
                      value={formData.flightId}
                      onChange={handleChange}
                    />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Ver Vuelos</Button>
              <Button variant="outline" className="w-full">Modificar pasajero</Button>
              <div className="w-full flex justify-between space-x-2">
                <Button variant="destructive" className="w-full">Cancelar Reserva</Button>
                <Button variant="destructive" className="w-full">Eliminar pasajero</Button>
              </div>
              <Button variant="ghost" className="w-full">Volver</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster/>
    </div>
  )
}