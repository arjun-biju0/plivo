// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Service {
  _id: string
  name: string
  status: string
}

const Dashboard = () => {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState("")

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setServices(res.data)
    } catch (err) {
      toast({ title: "Failed to fetch services" })
    }
  }

  const addService = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        "http://localhost:5000/api/services",
        { name: newService },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewService("")
      toast({ title: "Service added!" })
      fetchServices()
    } catch (err) {
      toast({ title: "Failed to add service" })
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Service */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="New service name"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        <Button onClick={addService}>Add</Button>
      </div>

      {/* List Services */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{service.name}</h2>
                <p className="text-sm text-muted-foreground">{service.status}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
