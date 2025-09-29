import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const Maintenance = () => {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState('Track');
  const [scheduledAt, setScheduledAt] = useState('');
  const [team, setTeam] = useState('Team A');
  const [upcoming, setUpcoming] = useState([]);
  const API_BASE = import.meta?.env?.VITE_API || '';

  const submit = async () => {
    const payload = { asset_id: asset, type, scheduled_at: scheduledAt, team_id: team };
    try {
      await fetch(`${API_BASE}/api/maintenance/schedule`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      alert('Maintenance scheduled');
      setUpcoming(prev => [...prev, { id: Date.now(), asset_id: asset, type, scheduled_at: scheduledAt, team_id: team, status: 'Scheduled' }]);
    } catch {
      alert('Mock: Maintenance scheduled');
      setUpcoming(prev => [...prev, { id: Date.now(), asset_id: asset, type, scheduled_at: scheduledAt, team_id: team, status: 'Scheduled' }]);
    }
  };

  useEffect(() => {
    setUpcoming([
      { id: 1, asset_id: 'Section B-12', type: 'Track', scheduled_at: '2025-09-29 14:30', team_id: 'Team A', status: 'Scheduled' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Maintenance</h1>
          <div className="bg-surface border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input label="Train ID or Equipment" value={asset} onChange={e=>setAsset(e.target.value)} />
            <Select label="Maintenance Type" options={["Track","Signal","Rolling Stock","Electrical"].map(v=>({label:v,value:v}))} value={type} onChange={setType} />
            <Input label="Scheduled Date & Time" type="datetime-local" value={scheduledAt} onChange={e=>setScheduledAt(e.target.value)} />
            <Select label="Assigned Team" options={["Team A","Team B","Team C"].map(v=>({label:v,value:v}))} value={team} onChange={setTeam} />
            <div className="md:col-span-2">
              <Button onClick={submit}>Schedule</Button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40 text-foreground">
                <tr>
                  <th className="text-left px-3 py-2">Asset</th>
                  <th className="text-left px-3 py-2">Type</th>
                  <th className="text-left px-3 py-2">Scheduled At</th>
                  <th className="text-left px-3 py-2">Team</th>
                  <th className="text-left px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(u => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="px-3 py-2">{u.asset_id}</td>
                    <td className="px-3 py-2">{u.type}</td>
                    <td className="px-3 py-2">{u.scheduled_at}</td>
                    <td className="px-3 py-2">{u.team_id}</td>
                    <td className="px-3 py-2">{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Maintenance;


