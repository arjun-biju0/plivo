export default function StatusCard({ service }) {
    const statusColor = {
      operational: 'text-green-600',
      degraded: 'text-yellow-600',
      down: 'text-red-600'
    };
  
    return (
      <div className="p-4 border rounded shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{service.name}</h2>
          <span className={`font-bold ${statusColor[service.status]}`}>
            {service.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">{service.description}</p>
        <p className="text-xs text-gray-500">Last updated: {new Date(service.lastUpdated).toLocaleString()}</p>
      </div>
    );
  }
  