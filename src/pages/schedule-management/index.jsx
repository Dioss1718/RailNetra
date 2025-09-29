import React from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const baseRows = [
  { id: '12951', name: 'Rajdhani', route: 'Mumbai–Delhi', dep: '16:55', arr: '08:35' },
  { id: '12301', name: 'Howrah Rajdhani', route: 'Delhi–Kolkata', dep: '17:00', arr: '10:05' },
  { id: '12621', name: 'Tamil Nadu Exp', route: 'Chennai–Delhi', dep: '22:30', arr: '06:15' },
  { id: '12137', name: 'Punjab Mail', route: 'Mumbai–Delhi', dep: '19:15', arr: '11:40' },
];

const updatedRows = [
  { id: '12951', name: 'Rajdhani', route: 'Mumbai–Delhi', dep: '16:55', arr: '08:35' },
  { id: '12301', name: 'Howrah Rajdhani', route: 'Delhi–Kolkata', dep: '16:55', wasDep: '17:00', arr: '10:05' },
  { id: '12621', name: 'Tamil Nadu Exp', route: 'Chennai–Delhi', dep: '22:30', arr: '06:15' },
  { id: '12137', name: 'Punjab Mail', route: 'Mumbai–Delhi', dep: '19:15', arr: '11:40' },
];

const GridTable = ({ title, rows, highlightChanges = false }) => (
  <div className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col">
    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="text-xs text-muted-foreground">{rows.length} trains</div>
    </div>
    <div className="overflow-auto max-h-[60vh]">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted/40 text-foreground">
            <th className="text-left font-medium px-3 py-2 w-28">Train</th>
            <th className="text-left font-medium px-3 py-2">Route</th>
            <th className="text-left font-medium px-3 py-2 w-28">Departure</th>
            <th className="text-left font-medium px-3 py-2 w-28">Arrival</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <td className="px-3 py-2 font-medium text-foreground">
                <div>{r.id}</div>
                <div className="text-xs text-muted-foreground">{r.name}</div>
              </td>
              <td className="px-3 py-2">{r.route}</td>
              <td className={`px-3 py-2 align-top ${highlightChanges && r.wasDep ? 'bg-primary/10 text-primary font-semibold rounded' : '' }`}>
                <div>{r.dep}</div>
                {highlightChanges && r.wasDep && (
                  <div className="text-[11px] text-muted-foreground">was: {r.wasDep}</div>
                )}
              </td>
              <td className="px-3 py-2">{r.arr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ChangeSummaryPanel = () => (
  <aside className="w-full lg:w-80 xl:w-96 shrink-0 bg-surface border border-border rounded-lg overflow-hidden">
    <div className="px-4 py-3 border-b border-border">
      <h3 className="text-sm font-semibold text-foreground">Change Summary</h3>
      <p className="text-xs text-muted-foreground">AI optimization results for current schedule</p>
    </div>
    <div className="p-4 space-y-4">
      <div>
        <div className="text-sm font-medium text-foreground mb-2">Change Statistics</div>
        <div className="grid grid-cols-2 gap-3">
          {[{l:'Priorities Updated',v:3},{l:'Departures Adjusted',v:2},{l:'New Notes',v:5},{l:'Platforms Updated',v:4}].map(i=> (
            <div key={i.l} className="rounded-md border border-border p-3">
              <div className="text-xs text-muted-foreground">{i.l}</div>
              <div className="text-lg font-semibold text-foreground">{i.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-foreground mb-2">Approval Status</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: 'Approved', v: 5, cls: 'text-success' },
            { l: 'Pending', v: 8, cls: 'text-warning' },
            { l: 'Rejected', v: 2, cls: 'text-error' },
          ].map(s => (
            <div key={s.l} className="rounded-md border border-border p-3 text-center">
              <div className={`text-2xl font-bold ${s.cls}`}>{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-foreground mb-2">Implementation Impact</div>
        <div className="rounded-lg border border-border p-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">15</div>
            <div className="text-xs text-muted-foreground">Affected Trains</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-xs text-muted-foreground">Affected Routes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">15 min</div>
            <div className="text-xs text-muted-foreground">Implement Time</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 rounded-md border border-border h-9 text-sm">Reject All</button>
        <button className="flex-1 rounded-md bg-primary text-primary-foreground h-9 text-sm">Approve All</button>
      </div>
    </div>
  </aside>
);

const ScheduleManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Schedule Management</h1>
                <p className="text-muted-foreground">Compare and approve AI-optimized schedule changes</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="max-w-xl">
              <Input placeholder="Search trains, routes..." />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GridTable title="Base Schedule" rows={baseRows} />
              <GridTable title="Updated Schedule" rows={updatedRows} highlightChanges />
            </div>
            <ChangeSummaryPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScheduleManagement;


