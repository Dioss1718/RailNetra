import React from 'react';

const Slot = ({ time, section, train, status = 'normal', duration = '30m', side = 'left' }) => (
  <div className={`rounded-xl border-2 ${status === 'normal' ? 'border-success/60' : status === 'high' ? 'border-warning/80' : 'border-border'} bg-surface px-4 py-3 ${side === 'right' ? 'ml-auto' : ''} w-full`}
  >
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold text-foreground">{time}</div>
      <div className="text-xs text-muted-foreground">{duration}</div>
    </div>
    <div className="text-sm text-muted-foreground mt-1">{section}</div>
    <div className="text-xs text-muted-foreground">Train <span className="text-foreground font-medium">{train}</span></div>
    {status === 'high' && (
      <div className="mt-2 inline-flex items-center gap-2 text-warning text-sm">HIGH</div>
    )}
  </div>
);

const Timeline = () => {
  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-lg">
        <div className="px-4 py-3 border-b border-border flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2"><span className="i-lucide-calendar" /> 29/09/2025</div>
          <div className="ml-auto border border-border rounded-md px-2 py-1">14:00 - 15:00</div>
        </div>
        <div className="p-6 space-y-6">
          <Slot time="14:00" section="North Section" train="T-67890" status="normal" duration="30m" side="left" />
          <Slot time="14:30" section="East Section" train="T-12345" status="high" duration="45m" side="right" />
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2"><span className="h-2 w-2 bg-success rounded-full" /> Available</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 bg-warning rounded-full" /> Negotiating</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 bg-primary rounded-full" /> Confirmed</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 bg-error rounded-full" /> Conflict</div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;


