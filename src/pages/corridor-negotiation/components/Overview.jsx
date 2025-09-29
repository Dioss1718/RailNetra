import React from 'react';
import Icon from '../../../components/AppIcon';

const Node = ({ title, status = 'ok', badge }) => (
  <div className={`relative rounded-lg border ${
    status === 'ok' ? 'border-success/30' : status === 'warn' ? 'border-warning/30' : 'border-error/30'
  } bg-surface/50 px-4 py-3 w-36 text-center`}
  >
    {badge != null && (
      <div className="absolute -right-3 -top-3 h-6 min-w-6 px-1 rounded-full bg-warning text-background text-xs font-semibold flex items-center justify-center">
        {badge}
      </div>
    )}
    <div className="mx-auto mb-2 h-6 w-6 rounded-full flex items-center justify-center bg-background border border-border">
      <Icon name={status === 'ok' ? 'CheckCircle' : status === 'warn' ? 'Clock' : 'XCircle'} size={14} className={
        status === 'ok' ? 'text-success' : status === 'warn' ? 'text-warning' : 'text-error'
      } />
    </div>
    <div className="text-sm font-semibold text-foreground">{title}</div>
  </div>
);

const KPI = ({ label, value, colorClass }) => (
  <div className="bg-surface border border-border rounded-lg p-4">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
  </div>
);

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <span className="h-2 w-2 rounded-full bg-success" /> Live Network
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center gap-16">
            <Node title="West" status="error" />
            <div className="flex flex-col items-center gap-10">
              <Node title="North" status="ok" badge={3} />
              <Node title="Central" status="ok" />
              <Node title="South" status="ok" badge={1} />
            </div>
            <Node title="East" status="warn" badge={5} />
          </div>

          <div className="mt-6 inline-flex items-center gap-6 rounded-md border border-border px-4 py-2">
            <div className="text-sm font-medium text-foreground">Status Legend</div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" /> Connected
              <span className="h-2 w-2 rounded-full bg-warning" /> Negotiating
              <span className="h-2 w-2 rounded-full bg-error" /> Offline
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-lg font-semibold text-foreground mb-2">Active Negotiations</div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Pending Requests</span><span className="font-semibold text-warning">3</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Active Discussions</span><span className="font-semibold text-primary">5</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Completed Today</span><span className="font-semibold text-success">12</span></div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-lg font-semibold text-foreground mb-2">System Status</div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Negotiation Engine</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Message Exchange</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning" /> West Section Link</div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="text-lg font-semibold text-foreground mb-3">Quick Actions</div>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 rounded-md border border-border px-3 py-2 text-left hover:bg-muted/50">
              <Icon name="Plus" size={16} /> New Emergency Slot
            </button>
            <button className="w-full flex items-center gap-3 rounded-md border border-border px-3 py-2 text-left hover:bg-muted/50">
              <Icon name="MessageSquare" size={16} /> Broadcast Message
            </button>
            <button className="w-full flex items-center gap-3 rounded-md border border-border px-3 py-2 text-left hover:bg-muted/50">
              <Icon name="Settings" size={16} /> Configure Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;


