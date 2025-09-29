import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';

const ScheduleChanges = () => {
  const [rows, setRows] = useState([]);
  const API_BASE = import.meta?.env?.VITE_API || '';

  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/schedule/changes`);
      if (!res.ok) throw new Error('net');
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setRows([
        { id: 1, train_id: '12345', old_time: '17:00', new_time: '16:55', change_type: 'Departure', approved: false },
        { id: 2, train_id: '12951', old_time: '08:40', new_time: '08:35', change_type: 'Arrival', approved: false }
      ]);
    }
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    try {
      await fetch(`${API_BASE}/api/schedule/approve/${id}`, { method: 'POST' });
      setRows(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    } catch {
      setRows(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    }
  };

  const reject = async (id) => {
    try {
      await fetch(`${API_BASE}/api/schedule/reject/${id}`, { method: 'POST' });
      setRows(prev => prev.filter(r => r.id !== id));
    } catch {
      setRows(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Schedule Changes</h1>
          <div className="bg-surface border border-border rounded-lg overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40 text-foreground">
                <tr>
                  <th className="text-left px-3 py-2">Train No</th>
                  <th className="text-left px-3 py-2">Old Time</th>
                  <th className="text-left px-3 py-2">New Time</th>
                  <th className="text-left px-3 py-2">Change Type</th>
                  <th className="text-left px-3 py-2">Approved</th>
                  <th className="text-left px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-3 py-2">{r.train_id}</td>
                    <td className="px-3 py-2">{r.old_time}</td>
                    <td className="px-3 py-2">{r.new_time}</td>
                    <td className="px-3 py-2">{r.change_type}</td>
                    <td className="px-3 py-2">{r.approved ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2 flex gap-2">
                      {!r.approved && (
                        <>
                          <Button size="xs" onClick={() => approve(r.id)}>Approve</Button>
                          <Button size="xs" variant="danger" onClick={() => reject(r.id)}>Reject</Button>
                        </>
                      )}
                    </td>
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

export default ScheduleChanges;


