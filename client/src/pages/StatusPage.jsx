import { useEffect, useState } from 'react';
import API from '../api';
import StatusCard from '../components/StatusCard';

export default function StatusPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getList=async()=>{
        const res= await API.get('/services')
        console.log(res);
        setServices(res.data)
        
    }
    getList()
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔧 Service Status</h1>
      {services.map(service => (
        <StatusCard key={service._id} service={service} />
      ))}
    </div>
  );
}
