// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
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
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("operational");

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
        { name: newService,
            description,
            status
         },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNewService("")
      setDescription("")
      toast({ title: "Service added!" })
      fetchServices()
    } catch (err) {
      toast({ title: "Failed to add service" })
    }
  }
  const updateStatus = async (id: string, newStatus: string) => {
    try {
        console.log(id);
        
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:5000/api/services/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast({ title: "Status updated" })
      fetchServices()
    } catch (err) {
      toast({ title: "Failed to update status" })
    }
  }
  const deleteService = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast({ title: "Service deleted" })
      fetchServices()
    } catch (err) {
      toast({ title: "Failed to delete service" })
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Welcome</h2>
        <Button
            className="bg-red-500 text-white hover:bg-red-600"
            variant="outline"
            onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
            }}
        >
            Logout
        </Button>
    </div>


      {/* Add Service */}
      <div className="max-w-2xl mx-auto mt-10 space-y-6 p-4 ">
        <Input
            placeholder="New service name"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
        />

        <Textarea
            placeholder="Service description"
            value={description}
            onChange={(e:any) => setDescription(e.target.value)}
        />

        <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
            <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Operational">Operational</SelectItem>
            <SelectItem value="Degraded Performance">Degraded Performance</SelectItem>
            <SelectItem value="Partial Outage">Partial Outage</SelectItem>
            <SelectItem value="Major Outage">Major Outage</SelectItem>
            </SelectContent>
        </Select>

        <Button onClick={addService} className="w-full">
            Add Service
        </Button>
    
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
                <Select
                    defaultValue=""
                    
                    onValueChange={(newStatus: any ) => updateStatus(service._id, newStatus)}
                    >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue className="text-sm text-black" placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Degraded Performance">Degraded Performance</SelectItem>
                        <SelectItem value="Partial Outage">Partial Outage</SelectItem>
                        <SelectItem value="Major Outage">Major Outage</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="destructive" onClick={() => deleteService(service._id)}>
                Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
