import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const ReportIncident = () => {
  const [type, setType] = useState('Delay');
  const [train, setTrain] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const API_BASE = import.meta?.env?.VITE_API || '';

  const submit = async () => {
    const payload = { type, train_id: train || null, location, description };
    try {
      const res = await fetch(`${API_BASE}/api/incidents/report`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('net');
      alert('Incident reported');
    } catch {
      alert('Mock: Incident reported');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Report Incident</h1>
          <div className="bg-surface border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Incident Type" value={type} onChange={setType} options={["Delay","Accident","Mechanical","Signal","Other"].map(v=>({label:v,value:v}))} />
            <Input label="Train Number (optional)" value={train} onChange={e=>setTrain(e.target.value)} />
            <Input label="Location" value={location} onChange={e=>setLocation(e.target.value)} />
            <div className="md:col-span-2">
              <Input label="Description" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Button onClick={submit}>Submit</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportIncident;


