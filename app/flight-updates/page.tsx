"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StateChip, StateChipProps } from "@/components/StateChip"
import { RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface FlightUpdate {
  flightId: string
  origen: string
  destino: string
  fecha: string
  hora: string
  previousState: string
  newState: string
}

export default function FlightUpdatesPage() {
  const [updates, setUpdates] = useState<FlightUpdate[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUpdates = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('https://aerolinea-updates-146516897953.us-central1.run.app/updates')
      setUpdates(response.data)
    } catch (error) {
      console.error('Error fetching updates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUpdates()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Flight Updates</h1>
        </div>
        <Button onClick={fetchUpdates} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <Table className="bg-white">
        <TableCaption>A list of recent flight updates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Flight ID</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Previous State</TableHead>
            <TableHead>New State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updates.map((update, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{update.flightId}</TableCell>
              <TableCell>{update.origen}</TableCell>
              <TableCell>{update.destino}</TableCell>
              <TableCell>{update.fecha}</TableCell>
              <TableCell>{update.hora}</TableCell>
              <TableCell>
                <StateChip state={update.previousState as StateChipProps['state']} />
              </TableCell>
              <TableCell>
                <StateChip state={update.newState as StateChipProps['state']} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

