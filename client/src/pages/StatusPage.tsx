// src/pages/StatusPage.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";

type Service = {
  _id: string;
  name: string;
  status: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational": return "text-green-600";
    case "degraded": return "text-yellow-600";
    case "down": return "text-red-600";
    default: return "text-gray-600";
  }
};

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/public/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service Status</h1>
      {services.map(service => (
        <Card key={service._id} className="mb-4">
          <CardContent className="p-4 flex flex-col">
            <span className="font-semibold text-lg">{service.name}</span>
            <span className={`${getStatusColor(service.status)} text-sm`}>
              {service.status}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
