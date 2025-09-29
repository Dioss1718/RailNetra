import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Broadcast = () => {
  const [message, setMessage] = useState('');
  const API_BASE = import.meta?.env?.VITE_API || '';

  const send = async () => {
    const payload = { message };
    try {
      await fetch(`${API_BASE}/api/broadcast/send`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      alert('Broadcast sent');
    } catch {
      alert('Mock: Broadcast sent');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">System Broadcast</h1>
          <div className="bg-surface border border-border rounded-lg p-4">
            <Input label="Message" value={message} onChange={e=>setMessage(e.target.value)} />
            <div className="mt-3">
              <Button onClick={send}>Send Broadcast</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Broadcast;


