import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import socket from "@/utils/socket";

type Service = {
  _id: string;
  name: string;
  status: string;
};

type Incident = {
  _id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
  servicesAffected: string[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Operational": return "text-green-600";
    case "Maintenance": return "text-yellow-600";
    case "Partial Outage": return "text-orange-600";
    case "Major Outage": return "text-red-600";
    default: return "text-gray-600";
  }
};

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [timeline, setTimeline] = useState<Incident[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/public/services')
      .then(res => {
        setServices(res.data.services);
        setIncidents(res.data.activeIncidents);
        setTimeline(res.data.timeline);
      });
    socket.on("status-update", (payload) => {
      if (payload.type === "service") {
        setServices((prev) =>
          prev.map((s) => (s._id === payload.data._id ? payload.data : s))
        );
      }
  
      if (payload.type === "incident") {
        setIncidents((prev) => {
          const exists = prev.find(i => i._id === payload.data._id);
          if (payload.data.status === "resolved") {
            // move to timeline
            setTimeline(t => [payload.data, ...t]);
            return prev.filter(i => i._id !== payload.data._id);
          }
          return exists
            ? prev.map(i => (i._id === payload.data._id ? payload.data : i))
            : [...prev, payload.data];
        });
      }
    });
    // Clean up on unmount
    return () => {
      socket.off("status-update");
    };
  
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service Status</h1>

      {/* Section 1: Current Service Status */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
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
      </section>

      {/* Section 2: Active Incidents & Maintenances */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Active Incidents & Maintenances</h2>
        {incidents.length === 0 ? (
          <p className="text-sm text-gray-500">No active issues.</p>
        ) : (
          incidents.map(i => (
            <Card key={i._id} className="mb-3 border-l-4 border-red-500">
              <CardContent className="p-4">
                <p className="font-medium">{i.title} <span className="text-xs text-gray-400">({i.type})</span></p>
                <p className="text-sm text-gray-700">{i.description}</p>
                <p className="text-sm text-gray-400">Started: {new Date(i.createdAt).toLocaleString()}</p>
                <p className="text-sm">Affected: {i.servicesAffected.join(', ')}</p>
              </CardContent>
            </Card>
          ))
        )}
      </section>

      {/* Section 3: Timeline / History */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Incident Timeline</h2>
        {timeline.length === 0 ? (
          <p className="text-sm text-gray-500">No history available.</p>
        ) : (
          timeline.map(e => (
            <div key={e._id} className="border-l pl-4 mb-4">
              <p className="text-sm font-medium">{e.title} <span className="text-xs text-gray-400">({e.type})</span></p>
              <p className="text-xs text-gray-500">
                {new Date(e.createdAt).toLocaleString()} → {e.status === "resolved" ? `Resolved: ${new Date(e.resolvedAt!).toLocaleString()}` : "Ongoing"}
              </p>
              <p className="text-sm text-gray-600">{e.description}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
