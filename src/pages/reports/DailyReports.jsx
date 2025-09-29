import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const DailyReports = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [rows, setRows] = useState([]);
  const API_BASE = import.meta?.env?.VITE_API || '';

  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reports/daily-summary?date=${date}`);
      if (!res.ok) throw new Error('net');
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      // mock fallback
      setRows([
        { id: 1, train_id: '12345', from_station: 'Delhi', to_station: 'Mumbai', dep_time: '08:30', arr_time: '11:00', status: 'On Time' },
        { id: 2, train_id: '12951', from_station: 'Mumbai', to_station: 'Delhi', dep_time: '16:55', arr_time: '08:35', status: 'Delayed' }
      ]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Daily Reports</h1>
          </div>
          <div className="bg-surface border border-border rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input type="date" label="Date" value={date} onChange={e=>setDate(e.target.value)} />
            <div className="md:self-end">
              <Button onClick={load}>Generate Report</Button>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40 text-foreground">
                <tr>
                  <th className="text-left px-3 py-2">Train ID</th>
                  <th className="text-left px-3 py-2">From</th>
                  <th className="text-left px-3 py-2">To</th>
                  <th className="text-left px-3 py-2">Departure</th>
                  <th className="text-left px-3 py-2">Arrival</th>
                  <th className="text-left px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-3 py-2">{r.train_id}</td>
                    <td className="px-3 py-2">{r.from_station}</td>
                    <td className="px-3 py-2">{r.to_station}</td>
                    <td className="px-3 py-2">{r.dep_time}</td>
                    <td className="px-3 py-2">{r.arr_time}</td>
                    <td className="px-3 py-2">{r.status}</td>
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

export default DailyReports;


