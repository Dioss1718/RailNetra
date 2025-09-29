import React from 'react';

const Item = ({ title, status, train, section, duration, finalSlot, time }) => (
  <div className="border border-border rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-muted/40 flex items-center justify-center">✓</div>
        <div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">Train: <span className="text-foreground">{train}</span> • Section: {section} • Duration: {duration}</div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground text-right">
        <div>{time} ago</div>
        <div className="mt-1">Final Slot <span className="text-primary font-mono">{finalSlot}</span></div>
      </div>
    </div>
    <div className="mt-3 text-xs">
      <span className={`rounded-full px-2 py-0.5 border border-border ${status === 'COMPLETED' ? 'text-success' : status === 'REJECTED' ? 'text-error' : ''}`}>{status}</span>
    </div>
  </div>
);

const History = () => {
  const data = [
    { title: 'Slot Confirmation', status: 'COMPLETED', train: 'T-67890', section: 'North Section', duration: '5 minutes', finalSlot: '14:30 - 15:00', time: '30m' },
    { title: 'Delay Accommodation', status: 'COMPLETED', train: 'T-12345', section: 'East Section', duration: '12 minutes', finalSlot: '14:45 - 15:30', time: '1h' },
    { title: 'Emergency Slot', status: 'COMPLETED', train: 'T-99999', section: 'West Section', duration: '3 minutes', finalSlot: '13:45 - 14:15', time: '2h' },
    { title: 'Maintenance Window', status: 'REJECTED', train: 'T-44444', section: 'South Section', duration: '—', finalSlot: '-', time: '3h' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-lg p-3 flex items-center gap-3">
        <select className="h-9 rounded-md border border-input bg-background px-2 text-sm"><option>Today</option></select>
        <select className="h-9 rounded-md border border-input bg-background px-2 text-sm"><option>All Status</option></select>
        <button className="ml-auto rounded-md border border-border px-3 h-9 text-sm">Export</button>
      </div>
      {data.map((d, i) => <Item key={i} {...d} />)}
    </div>
  );
};

export default History;


