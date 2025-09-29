import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const AddTrain = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [routeId, setRouteId] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [dep, setDep] = useState('');
  const [arr, setArr] = useState('');
  const API_BASE = import.meta?.env?.VITE_API || '';

  const submit = async () => {
    const payload = { name, number, route_id: routeId, frequency, dep_time: dep, arr_time: arr };
    try {
      const res = await fetch(`${API_BASE}/api/trains/create`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('net');
      alert('Train created');
    } catch {
      alert('Mock: Train created');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Add Train</h1>
          <div className="bg-surface border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Train Name" value={name} onChange={e=>setName(e.target.value)} />
            <Input label="Train Number" value={number} onChange={e=>setNumber(e.target.value)} />
            <Select label="Route" options={[{label:'Delhi–Mumbai', value:'1'}, {label:'Delhi–Kolkata', value:'2'}]} value={routeId} onChange={setRouteId} />
            <Select label="Frequency" options={[{label:'Daily',value:'Daily'},{label:'Weekly',value:'Weekly'}]} value={frequency} onChange={setFrequency} />
            <Input label="Departure Time" type="time" value={dep} onChange={e=>setDep(e.target.value)} />
            <Input label="Arrival Time" type="time" value={arr} onChange={e=>setArr(e.target.value)} />
            <div className="md:col-span-2">
              <Button onClick={submit}>Create Train</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTrain;


