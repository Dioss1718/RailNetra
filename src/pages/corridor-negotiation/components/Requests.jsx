import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const sampleRequests = [
  {
    id: 'req-001',
    type: 'Slot Change',
    priority: 'HIGH',
    train: 'T-12345',
    section: 'East Section',
    timeAgo: '15m ago',
    original: '14:30 - 15:15',
    requested: '14:45 - 15:30',
    reason: 'Signal failure causing 15-minute delay',
    impact: { affected: ['T-67890', 'T-11111'], delay: '5 minutes' }
  },
  {
    id: 'req-002',
    type: 'Emergency Slot',
    priority: 'URGENT',
    train: 'T-99999',
    section: 'West Section',
    timeAgo: '30m ago',
    original: '13:45 - 14:15',
    requested: 'Immediate',
    reason: 'Medical emergency - priority passenger transport'
  },
  {
    id: 'req-003',
    type: 'Maintenance Window',
    priority: 'NORMAL',
    train: 'T-77777',
    section: 'South Section',
    timeAgo: '5m ago',
    original: '17:00 - 18:00',
    requested: '17:30 - 18:30',
    reason: 'Track maintenance completion delayed by 30 minutes',
    impact: { affected: ['T-88888'], delay: '10 minutes' }
  }
];

const Requests = () => {
  const [requests, setRequests] = useState(sampleRequests);

  const handleAction = (id, action) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    console.log(`${action} for ${id}`);
  };

  return (
    <div className="space-y-4">
      {requests.map(req => (
        <div key={req.id} className="bg-surface border border-border rounded-lg">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted/40 flex items-center justify-center">
                <Icon name={req.type === 'Emergency Slot' ? 'AlertTriangle' : 'Clock'} size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-base font-semibold text-foreground">{req.type}</div>
                  <span className="text-xs rounded-full px-2 py-0.5 border border-border bg-background">{req.priority}</span>
                </div>
                <div className="text-xs text-muted-foreground flex gap-4">
                  <span>Train: <span className="text-foreground font-medium">{req.train}</span></span>
                  <span>Section: <span className="text-foreground font-medium">{req.section}</span></span>
                  <span>Time: {req.timeAgo}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Request ID<br /><span className="text-foreground">{req.id}</span></div>
          </div>

          <div className="px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Original Slot</div>
              <div className="font-mono text-foreground">{req.original}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Requested Slot</div>
              <div className="font-mono text-primary">{req.requested}</div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Reason</div>
              <div className="text-foreground">{req.reason}</div>
            </div>

            {req.impact && (
              <div className="lg:col-span-2 border border-border rounded-md p-3">
                <div className="flex items-center gap-2 text-warning mb-2">
                  <Icon name="AlertTriangle" size={16} /> Impact Analysis
                </div>
                <div className="text-sm text-muted-foreground">Affected Trains: <span className="text-foreground">{req.impact.affected.join(', ')}</span></div>
                <div className="text-sm text-muted-foreground">Estimated Additional Delay: <span className="text-foreground">{req.impact.delay}</span></div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <button className="text-sm inline-flex items-center gap-2 text-foreground/80 hover:text-foreground">
              <Icon name="Eye" size={16} /> View Details
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => handleAction(req.id, 'counter')} className="inline-flex items-center gap-2 border border-border rounded-md px-3 py-2 text-sm hover:bg-muted/50">
                <Icon name="MessageSquare" size={16} /> Counter Offer
              </button>
              <button onClick={() => handleAction(req.id, 'reject')} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-error text-error-foreground">
                <Icon name="X" size={16} /> Reject
              </button>
              <button onClick={() => handleAction(req.id, 'accept')} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-success text-success-foreground">
                <Icon name="Check" size={16} /> Accept
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;


